#!/usr/bin/env python
# encoding: utf-8


from flask import Flask, jsonify, request, redirect, url_for, render_template
from flask_cors import CORS
from databse import app
from Gmail.gmail_api import *
from Spotify.spotify import Spotify
from Google_Calendar.gcalendar import *
from Register.routes import Signup
from Login.routes import Signin
from Check_token.routes import Token
from OutlookCalendar.outlookCal import *
from Github.github import Github
from Profile.routes import Profile
from Choose_service.routes import Choose_service
from ManageArea.routes import ManageArea
from Slack.slack import Slack
from flask_swagger_ui import get_swaggerui_blueprint
import about
import json

SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
SWAGGERUI_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Seans-Python-Flask-REST-Boilerplate"
    }
)

# from gmail_api import *
CORS(app, support_credentials=True)
app.register_blueprint(Gmail)
app.register_blueprint(Spotify)
app.register_blueprint(GCalendar)
app.register_blueprint(Signup)
app.register_blueprint(Signin)
app.register_blueprint(Token)
app.register_blueprint(Github)
app.register_blueprint(OutlookCal)
app.register_blueprint(Profile)
app.register_blueprint(Choose_service)
app.register_blueprint(ManageArea)
app.register_blueprint(Slack)
app.register_blueprint(SWAGGERUI_BLUEPRINT, url_prefix=SWAGGER_URL)

@app.route('/')
def index():
    print("here")
    return 'Home', 200

@app.route('/about.json', methods=['GET'])
def render_aboutJson():
    about.ABOUT_JSON['client']['host'] = request.remote_addr
    return json.dumps(about.ABOUT_JSON, indent=2), 200

@app.route('/googled4a25008c075c27d.html', methods=['GET'])
def validation_file():
    return render_template('googled4a25008c075c27d.html')

#un mail est envoyé avec un fichier attaché et est enregistré dans Microsoft One Drive
@app.route('/attachment_webhook', methods=['POST', 'GET'])
def gmail_areas():
    file = attachment_webhook()
    sender = important_mails_webhook()
    if file != None:
        save_file(file)
    if sender != None:
        mails_to_answer_reminder(sender)
    return 'OK', 200

if __name__ == '__main__':
    cors = CORS(app, ressources={r"/*": {'origins': '*'}})
    app.run()
