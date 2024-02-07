#!/usr/bin/env python
# encoding: utf-8

from flask import Blueprint, redirect, request, jsonify, session
import requests
import random
import json
import smtplib
from email.mime.text import MIMEText

access_token = 0

Github = Blueprint('Github', __name__)

def create_random_string():
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    new_string = []
    r = len(alphabet)
    for _ in range(8):
        p = random.randint(0, r-1)
        new_string.append(alphabet[p])
    return new_string

def get_user_infos(token):
    headers = {
        'Authorization': f'Token {token}',
        'User-Agent': 'Area',
        'Content-Type': 'application/json'
    }

    response = requests.get(
        'https://api.github.com/user',
        headers=headers
    )

    data = response.json()
    return data

@Github.route('/github_login')
def github_login():
    # Rediriger l'utilisateur vers la page d'autorisation GitHub
    client_id = '84dcc94d870d95b4fe57'
    redirect_uri = 'http://127.0.0.1:5000/github_callback'
    state = create_random_string() # Optionnel
    scopes ="admin:org, repo, user, admin:repo_hook, project"
    return redirect(f"https://github.com/login/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&state={state}&scope={scopes}")

@Github.route('/github_callback')
def github_callback():
    global access_token
    # Obtenir le code à partir des paramètres de la requête
    code = request.args.get('code')
    state = request.args.get('state')
    client_id = "84dcc94d870d95b4fe57"
    client_secret = "66fd9578f2bb6f433f6d34ecd80b60c33189f8d6"
    redirect_uri = "http://127.0.0.1:5000/github_callback"
    expected_state = state

    # Vérifiez que le paramètre d'état correspond à celui que vous avez envoyé précédemment
    if state != expected_state:
        return "Error: invalid state"

    # Échangez le code contre un jeton d'accès
    response = requests.post("https://github.com/login/oauth/access_token", headers={
        "Accept": 'application/json',
        'Content-Type': 'application/json',
        }, data=json.dumps({
        "client_id": client_id,
        "client_secret": client_secret,
        "code": code,
        "redirect_uri": redirect_uri,
        "state": state,
    }))
    data = response.json()
    access_token = data.get('access_token')
    if not access_token:
        return "Error: access token not found in response"

    # Utilisez l'access_token pour obtenir des informations sur l'utilisateur
    return redirect(f"/user_infos/{access_token}")

@Github.route('/user_infos/<token>', methods=['GET'])
# Obtenir toutes les informations de l'utilisateur
def user_infos(token):
    infos = get_user_infos(token)
    return jsonify(infos)

@Github.route('/repos/<username>')
# Obtenir une liste de tous les repository de l'utilisateur
def get_repos(username):
    url = f'https://api.github.com/users/{username}/repos'
    response = requests.get(url)
    repos = [repo['name'] for repo in response.json()]
    return jsonify(repos)

@Github.route('/make_push', methods=['POST'])
# Crée l'action webhook sur le repo de l'utilisateur
def get_push():
    global access_token
    data = request.get_json()
    username = user_infos['login']
    repo = data.get('repo')
    url = 'https://dd8d-51-159-197-229.eu.ngrok.io/webhook' # l'URL d'écoute que vous avez créée dans l'étape 1
    token = access_token

    response = requests.post(f'https://api.github.com/repos/{username}/{repo}/hooks',
                            headers={'Authorization': f'Bearer {token}'},
                            json={
                                'name': 'web',
                                'active': True,
                                'events': ['push', 'issues'],
                                'config': {
                                    'url': url,
                                    'content_type': 'json'
                                }
                            })

    if response.status_code == 201:
        print('Webhook créé avec succès :', response.json())
    else:
        print('Erreur lors de la création de la webhook :', response.status_code, response.text)
    return 'OK', 200

# Message du push
def pushMessage(payload, message):
    message += "Nom du dépôt: " + payload['repository']['full_name'] + "\n"
    message += "Nom de l'utilisateur: " + payload['sender']['login'] + "\n"
    message += "Message du commit: " + payload['head_commit']['message'] + "\n"
    return (message)

# Message pour l'issue
def issuesMessage(payload, message):
    message += "Nom du dépôt: " + payload['repository']['full_name'] + "\n"
    message += "Nom de l'utilisateur ayant créée l'issu: " + payload['sender']['login'] + "\n"
    message += "Intitulé du message: " + payload['issue']['title'] + "\n"
    message += "Message de l'issue: " + payload['issue']['body'] + "\n"
    return (message)

#password: authtrnpndlqxfwx
# Envoie du mail
def sentNewEmail(dest, subject, message):
    sender = "area.epitech23@gmail.com"
    msg = MIMEText(message)
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = dest
    # Envoyer le message
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.login(sender, "authtrnpndlqxfwx")
    server.sendmail(sender, dest, msg.as_string())
    server.quit()
    return "Push event received and email sent"

# Gère le webhook pour l'événement 'push'
@Github.route('/webhook', methods=['POST'])
def handle_webhook():
    payload = request.get_json()
    print('Webhook reçu :', payload)
    dest = "zihada2002@gmail.com" #le mail de l'utilisateur qui s'est connecté à notre plateforme
    if payload.get('issue') != None:
        if payload['action'] == "opened":
           sentNewEmail(dest, "Nouvelle issue créée", issuesMessage(payload, "Une nouvelle issue a été créée sur le dépôt Git\n\n"))
        elif payload['action'] == "edited":
            sentNewEmail(dest, "Mise à jour d'une issue", issuesMessage(payload, "Il y'a eu une modification d'une issue sur le dépôt Git\n\n"))
    else:
        if payload['created'] == True:
            sentNewEmail(dest, "Nouveau push sur Git", pushMessage(payload, "Un nouveau push a été effectué dans le dépôt Git\n\n"))
        else:
            sentNewEmail(dest, "Mise à jour sur Git", pushMessage(payload, "Il y a eu une mise à jour dans le dépôt Git\n\n"))
    return "Push event received and email sent", 200

# Gère le logout de l'utilisateur sur github
@Github.route('/github_logout')
def logout():
    session.pop(access_token, None)
    return "Logout"
