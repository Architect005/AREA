import datetime
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google_auth_oauthlib.flow import Flow
import base64
from flask import Blueprint, redirect, request
from datetime import datetime, timedelta
import uuid
import json
import smtplib
from email.mime.text import MIMEText

GCalendar = Blueprint('GCalendar', __name__)

global gcalendar_service

SCOPES = ['https://www.googleapis.com/auth/calendar.readonly',
          'https://www.googleapis.com/auth/calendar.events',
          'https://www.googleapis.com/auth/calendar',
          'https://www.googleapis.com/auth/calendar.events.readonly']

@GCalendar.route('/auth_gcalendar', methods=['POST', 'GET'])
def auth_to_calendar():
    global gcalendar_service
    creds = None
    flow = InstalledAppFlow.from_client_secrets_file(
        'credentials.json',
        scopes=SCOPES,
        redirect_uri='https://area-backend-v1.azurewebsites.net/auth_gcalendar'
    )
    print(request.args)
    if request.method == "GET" and not request.args.get('code'):
        if os.path.exists('token.json'):
            creds = Credentials.from_authorized_user_file('token.json', SCOPES)
            try:
                service = build('calendar', 'v3', credentials=creds)
                gcalendar_service = service
                return 'OK', 200
            except:
                pass
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                auth_url, _ = flow.authorization_url()
                print(auth_url)
                return redirect(auth_url)
    # if request.method == "POST":
    else:
        # print(res.data)
        code = request.args.get('code') or None
        print(code)
        flow.fetch_token(code=code)
        creds = flow.credentials
        try:
            service = build('calendar', 'v3', credentials=creds)
            print(type(service))
            gcalendar_service = service
            with open('token.json', 'w') as token:
                token.write(creds.to_json())
        except:
            return 'Fail', 401
    return 'OK', 200

# rappels pour répondre aux mails importants
#@GCalendar.route('/mail_answering_reminder', methods=['POST', 'GET'])
def mails_to_answer_reminder(sender):
    time = datetime.now()
    global gcalendar_service
    start = time + timedelta(minutes=15)
    end = start + timedelta(minutes=25)
    event = {
        'summary': 'Google I/O 2015',
        'location': '983W+QJC Cotonou',
        'description': 'Reminder to answer the mails of ' + sender,
        'start': {
            'dateTime': start.strftime("%Y-%m-%dT%H:%M:%SZ"),
            'timeZone': 'Africa/Porto-Novo',
        },
        'end': {
            'dateTime': end.strftime("%Y-%m-%dT%H:%M:%SZ"),
            'timeZone': 'Africa/Porto-Novo',
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'attendees': [
        ],
        'reminders': {
            'useDefault': True,
        },
    }
    new_event = gcalendar_service.events().insert(
        calendarId='primary', body=event).execute()
    #return 'OK', 200

def generate_meta(event):
    summary = event['summary']
    creator = event['creator'].get('email', event['creator'].get('email'))
    print('creator', creator)
    print('summary', summary)
    return summary, creator

def is_new_event(event):
    created = event["created"]
    updated = event["updated"]

    created_timestamp = datetime.strptime(created, '%Y-%m-%dT%H:%M:%S.%fZ').timestamp()
    updated_timestamp = datetime.strptime(updated, '%Y-%m-%dT%H:%M:%S.%fZ').timestamp()
    diff = abs(updated_timestamp - created_timestamp)

    max_diff = 2000
    return diff <= max_diff

def is_event_relevant(event):
    return  is_new_event(event)

##################Calendar modification webhook####################
@GCalendar.route('/calendar_modification', methods=['POST', 'GET'])
def calendar_modification():
    global gcalendar_service
    eventcollect = {
        'id': str(uuid.uuid1()),
        'type': "web_hook",
        'address': 'https://area-backend-v1.azurewebsites.net/calendar_modification'
    }
    watch_resp = gcalendar_service.events().watch(calendarId='primary', body=eventcollect).execute()

    if request.method == "POST":
        notification_data = request.get_json()
        print("notification_data", notification_data)
        #notification_data = json.loads(notification_message.decode('utf-8'))

        # Retrieve the event ID from the notification data
        event_id = notification_data['id']

        # Retrieve the updated event details from the Calendar API
        event = gcalendar_service.events().get(calendarId='primary', eventId=event_id).execute()
        organizer = event["creator"]["email"]
        sender = gcalendar_service.calendars().get(calendarId='primary').execute()
        msg = MIMEText("I got your modification to my calendar. Thank you!")
        msg['Subject'] = "Calendar modification"
        msg['From'] = sender
        msg['To'] = organizer
        # Envoyer le message
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.login(sender, "authtrnpndlqxfwx")
        server.sendmail(sender, organizer, msg.as_string())
        server.quit()
    return 'OK', 200
