#!/usr/bin/env python
# encoding: utf-8

# Imports
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
import base64
from email.mime.text import MIMEText
from googleapiclient.errors import HttpError
import os
from flask import Blueprint, request, redirect, session, url_for

Gmail = Blueprint('Gmail', __name__)

global gmail_service
old_history_id = None
# Authenticate
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.modify',
        'https://mail.google.com/']

@Gmail.route('/auth_gmail', methods=['POST', 'GET'])
def gmail_authenticate():
    global gmail_service
    creds = None
    flow = InstalledAppFlow.from_client_secrets_file(
        'credentials.json',
        scopes=SCOPES,
        redirect_uri='https://area-backend-v1.azurewebsites.net/auth_gmail_cb'
    )
    print(request.args)
    if request.method == "GET":
        if os.path.exists('token.json'):
            creds = Credentials.from_authorized_user_file('token.json', scopes=SCOPES)
            try:
                service = build('gmail', 'v1', credentials=creds)
                gmail_service = service
                return 'OK', 200
            except:
                pass
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                auth_url, state = flow.authorization_url()
                print(auth_url)
                session['state'] = state
                return redirect(auth_url)
    else:
        pass
    return 'OK', 200

def credentials_to_dict(credentials):
  return {'token': credentials.token,
          'refresh_token': credentials.refresh_token,
          'token_uri': credentials.token_uri,
          'client_id': credentials.client_id,
          'client_secret': credentials.client_secret,
          'scopes': credentials.scopes}


@Gmail.route('/auth_gmail_cb', methods=['POST', 'GET'])
def gmail_authenticate_cb():
    global gmail_service
    state = session['state']
    flow = InstalledAppFlow.from_client_secrets_file(
        'credentials.json',
        scopes=SCOPES,
        state=state
    )
    flow.redirect_uri = 'https://area-backend-v1.azurewebsites.net/auth_gmail_cb'
    try:
        authorization_response = request.url[:4] + 's' + request.url[4:]
        print("authorization", authorization_response)
        flow.fetch_token(authorization_response=authorization_response)
        creds = flow.credentials
        print('creds:', creds)
        service = build('gmail', 'v1', credentials=creds)
        gmail_service = service
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    except Exception as e:
        return 'Fail\n'+str(e), 401
    return 'OK', 200


####################################gmail####################################
#new mail gmail webhook
def new_mail_webhook():
    global gmail_service
    request = {
      'labelIds': ['INBOX'],
      'topicName': 'projects/potent-ripple-375509/topics/MyTopic'
    }
    notification = gmail_service.users().watch(userId='me', body=request).execute()
    print('notification', notification)
    if notification['historyId'] and notification['expiration']:
        results = gmail_service.users().messages().list(userId='me', labelIds=['INBOX'], q='is:unread').execute()
        messages = results.get('messages', [])
        if not messages:
            pass
        else:
            message = messages[0]
            msg = gmail_service.users().messages().get(userId='me', id=message['id']).execute()
            msg_body = msg['snippet']
            print('message', msg_body)
            entry = 'Check this out :'
            if (msg_body[:16].casefold() == entry.casefold()):
                records = msg_body[16:].split(' ', 2)
                print('records:', records)
                return records[0], records[2]
    return None, None

#mail avec fichier attaché
#@Gmail.route('/attachment_webhook', methods=['POST', 'GET'])
def attachment_webhook():
    global gmail_service
    global old_history_id
    request = {
      'labelIds': ['INBOX'],
      'topicName': 'projects/potent-ripple-375509/topics/MyTopic'
    }
    notification = gmail_service.users().watch(userId='me', body=request).execute()
    print('notification', notification)
    if notification['historyId'] and notification['expiration']:
        results = gmail_service.users().messages().list(userId='me', labelIds=['INBOX'], q='is:unread has:attachment').execute()
        messages = results.get('messages', [])
        if not messages:
            pass
        else:
            save_location = os.getcwd()
            print("Loc: ", save_location)
            message = messages[0]
            msg = gmail_service.users().messages().get(userId='me', id=message['id']).execute()
            msg_body = msg['snippet']
            print('message', msg_body)
            msg_playload = msg['payload']
            parts = msg_playload['parts'][1]
            body = parts["body"]
            if 'attachmentId' in body:
                attachmentId = body['attachmentId']
                attachment = gmail_service.users().messages().attachments().get(userId='me', messageId=message['id'], id=attachmentId).execute()
                file_data = base64.urlsafe_b64decode(attachment.get('data').encode('UTF-8'))
                print("filename: ", parts["filename"])
                with open(os.path.join(save_location, parts["filename"]), 'wb') as file:
                    file.write(file_data)
                return (os.path.join(save_location, parts["filename"]))
    return None

#mail importants
#@Gmail.route('/important_mails_webhook', methods=['POST', 'GET'])
def important_mails_webhook():
    global gmail_service
    #faire une requête dans la base de données, Loïc doit enregistrer ça
    #important_senders = []
    important_senders = ['viganhansarnold@gmail.com', 'yanntossou@gmail.com']
    request = {
      'labelIds': ['INBOX'],
      'topicName': 'projects/potent-ripple-375509/topics/MyTopic'
    }
    notification = gmail_service.users().watch(userId='me', body=request).execute()
    print('notification', notification)
    if notification['historyId'] and notification['expiration']:
        results = gmail_service.users().messages().list(userId='me', labelIds=['INBOX'], q='is:unread').execute()
        messages = results.get('messages', [])
        if not messages:
            pass
        else:
            message = messages[0]
            msg = gmail_service.users().messages().get(userId='me', id=message['id']).execute()
            email_data = msg['payload']['headers']
            print('email data:', email_data)
            for values in email_data:
                #print("values", values)
                name = values["name"]
                if name == "From":
                    sender = values["value"]
                    if sender in important_senders:
                        print("sender: ", sender)
                        return(sender)
    return None

def unsubscribe_webhook():
    gmail_service.users().stop(userId='me').execute()
