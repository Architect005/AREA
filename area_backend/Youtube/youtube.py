#!/usr/bin/env python
# encoding: utf-8

import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from flask import Blueprint, redirect, request
from email.mime.text import MIMEText
import xmltodict
import requests
import smtplib

Youtube = Blueprint('Youtube', __name__)

youtube_service = None

SCOPES = ['https://www.googleapis.com/auth/youtube',
          'https://www.googleapis.com/auth/youtube.force-ssl']

# AIzaSyBUft8FE4HZlL6NyKY-UbsAsbr1qMIVttw
@Youtube.route('/youtube_login')
def youtube_login():
    global youtube_service
    creds = None
    flow = InstalledAppFlow.from_client_secrets_file(
        'credentials.json',
        scopes=SCOPES,
        redirect_uri='http://127.0.0.1:5000/youtube_login'
    )
    print(request.args)
    if request.method == "GET" and not request.args.get('code'):
        if os.path.exists('token.json'):
            creds = Credentials.from_authorized_user_file('token.json', SCOPES)
            try:
                service = build('youtube', 'v3', credentials=creds)
                youtube_service = service
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
    else:
        code = request.args.get('code') or None
        print(code)
        flow.fetch_token(code=code)
        creds = flow.credentials
        try:
            service = build('youtube', 'v3', credentials=creds)
            print(service)
            youtube_service = service
            with open('token.json', 'w') as token:
                token.write(creds.to_json())
        except:
            return 'Fail', 401
    return 'OK', 200

# Définition de la route pour souscrire la chaîne YouTube au protocole PubSubHubbub
@Youtube.route('/subscribe_pubsubhubbub', methods=['POST', 'GET'])
def subscribe():
    global youtube_service
    if  request.method == 'POST':
        callback_url = 'https://423d-154-66-134-64.eu.ngrok.io/get_notification'
        
        id_chaine = 'UC_wYeqUUe1nCX8kMjkIb4Kw' #je reccupère l'id de la chaine youtube de l'utilisateur
        # Souscription au protocole PubSubHubbub
        req = requests.post('https://pubsubhubbub.appspot.com/subscribe',
                            data={
                                'hub.callback': callback_url,
                                'hub.mode': 'subscribe',
                                'hub.topic': f'https://www.youtube.com/xml/feeds/videos.xml?channel_id={id_chaine}',
                                'hub.verify': 'async',
                                'hub.secret': ''})
        return req.text

def sendEmail(emails, subject, message):
    sender_email = "area.epitech23@gmail.com"
    # Créer un objet MIMEText pour le message
    msg = MIMEText(message)
    msg['Subject'] = subject
    msg['From'] = sender_email
    msg['To'] = ', '.join(emails)

    # Configurer le serveur SMTP et envoyer le message
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.login(sender_email, "authtrnpndlqxfwx")
    server.sendmail(sender_email, emails, msg.as_string())
    server.quit()
    return "Email sent"

@Youtube.route('/get_notification', methods=['POST', 'GET'])
def get_notification():
    global youtube_service
    emails = ['zihada2002@gmail.com', 'dyathbachabi@gmail.com']
    print(request.method)
    if  request.method == 'POST':
        data = xmltodict.parse(request.data)
        print(data)
        if data['feed'].get('entry') != None and data['feed'].get('entry').get('updated') != None:
            video_id = data['feed']['entry']['yt:videoId']
            video_title = data['feed']['entry']['title']
            video_url = f'https://www.youtube.com/watch?v={video_id}'
            creator = data['feed']['entry']['author']['name']
            sendEmail(emails, f"Mise à jour sur la chaîne de {creator} ", f'Avez-vous récemment consulté la chaîne de {creator} ?\n Il y a du nouveau avec sa vidéo "{video_title}": {video_url}')
        return 'OK', 200
    else:
        # Envoi de la chaine de caractère de hub.challenge à l'api
        hub_challenge = request.args.get('hub.challenge')
        return hub_challenge, 200