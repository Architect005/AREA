from flask import Flask, Blueprint, request, json, jsonify
from databse import db
import jwt
import datetime
Choose_service = Blueprint('Choose_service', __name__)

@Choose_service.route('/Choose_service', methods=["POST", "GET"])
def Choose():
    if request.method == "POST":
        data = request.get_json()
        Service_name = data.get('service')
        print(Service_name)
        if Service_name == "Gmail":
            Action_Name = ["Notifications d'un message important reçu", "Envoie d'un mail avec un fichier attaché"]
            Color = "black"
            BackColor = "#f1f1f1"
        if Service_name == "Github":
            Action_Name = ["Un push a été effectué", "Une issue est créée sur un repository"]
            Color = "white"
            BackColor = "black"
        if Service_name == "Youtube":
            Action_Name = ["Une vidéo est likée", "Une vidéo est enregistrée", "Une vidéo est ajoutée à une playlist"]
            Color = "white"
            BackColor = "#ff0000"
        if Service_name == "Timer":
            Action_Name = ["Chaque matin à une heure programmer", "Chaque soir à une heure programmer"]
            Color = "white"
            BackColor = "grey"
            
        return json.dumps({
            "status": "success",
            "message": "Actions list send",
            "actions" : Action_Name,
            "color": Color,
            "BackColor": BackColor
        }), 200

@Choose_service.route('/Choose_service_reaction', methods=["POST", "GET"])
def Choose_service_reaction():
    if request.method == "POST":
        data = request.get_json()
        Service_actions_name = data.get('service_reaction')
        print(Service_actions_name)
        if Service_actions_name == "Envoie d'un mail avec un fichier attaché":
            Service_Reaction_Name = ["OneDrive", "Youtube"]
        if Service_actions_name == "Notifications d'un message important reçu":
            Service_Reaction_Name = ["Calendar"]

        if Service_actions_name == "Un push a été effectué":
            Service_Reaction_Name = ["Gmail"]
        if Service_actions_name == "Une issue est créée sur un repository":
            Service_Reaction_Name = ["Gmail"]

        if Service_actions_name == "Une vidéo est likée":
            Service_Reaction_Name = ["Gmail"]
        if Service_actions_name == "Une vidéo est enregistrée":
            Service_Reaction_Name = ["Gmail"]
        if Service_actions_name == "Une vidéo est ajoutée à une playlist":
            Service_Reaction_Name = ["Gmail"]

        if Service_actions_name == "Chaque matin à une heure programmer":
            Service_Reaction_Name = ["Gmail"]
        if Service_actions_name == "Chaque soir à une heure programmer":
            Service_Reaction_Name = ["Spotify"]

        return json.dumps({
            "status": "success",
            "message": "Actions list send",
            "actions" : Service_Reaction_Name
        }), 200


@Choose_service.route('/Choose_reaction', methods=["POST", "GET"])
def Choose_reaction():
    if request.method == "POST":
        data = request.get_json()
        Reaction_name = data.get('service')
        Action_name = data.get('action')
        print(Reaction_name)
        if Reaction_name == "OneDrive" and Action_name == "Envoie d'un mail avec un fichier attaché":
            Reaction_List = ["Enregistré le message dans microsoft OneDrive"]
        if Reaction_name == "OneDrive" and Action_name == "Notifications d'un message important reçu":
            Reaction_List = ["Rappel pour répondre aux mails"]

        if Reaction_name == "Gmail" and Action_name == "Une issue est créée sur un repository":
            Reaction_List = ["Un mail avec les infos nécessaires est envoyé à Gmail"]
        if Reaction_name == "Gmail" and Action_name == "Un push a été effectué":
            Reaction_List = ["Un mail avec les informations du push est envoyé à Gmail"]

        if Reaction_name == "Gmail" and Action_name == "Une vidéo est likée":
            Reaction_List = ["Notification Gmail avec les infos correspondantes"]
        if Reaction_name == "Gmail" and Action_name == "Une vidéo est enregistrée":
            Reaction_List = ["Notification Gmail avec les infos correspondantes"]
        if Reaction_name == "Gmail" and Action_name == "Une vidéo est ajoutée à une playlist":
            Reaction_List = ["Notification Gmail avec les infos correspondantes"]

        if Reaction_name == "Gmail" and Action_name == "Chaque matin à une heure programmer":
            Reaction_List = ["Un mail avec les infos nécessaires est envoyé à Gmail"]
        if Reaction_name == "Spotify" and Action_name == "Chaque soir à une heure programmer":
            Reaction_List = ["Jouer ma playlist du soir"]
            
        return json.dumps({
            "status": "success",
            "message": "Actions list send",
            "actions" : Reaction_List
        }), 200