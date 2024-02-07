from flask import Flask, Blueprint, request, json, jsonify, redirect, url_for
from databse import db
import jwt

ManageArea = Blueprint('ManageArea', __name__)

@ManageArea.route('/SendArea', methods=["POST", "GET"])
def StockArea():
    if request.method == "POST":
        data = request.get_json()
        Action = data.get('Action')
        Reaction = data.get('Reaction')
        _token = data.get('_token')
        Service_Reaction = data.get('Service_Reaction')
        Service_Action = data.get('Service_Action')
        if Action == None or Reaction == None:
            return json.dumps({
                "status": "error",
                "message": "Action and Reaction empty",
            }), 400
        print ("Action=", Action, "| Reaction=", Reaction, "| username=", _token)
        decoded = jwt.decode(_token, "secret", algorithms=["HS256"])
        db.Activation_service.insert_one({
            'email': decoded["email"],
            'Action': Action.replace("\"", ""),
            'Reaction': Reaction.replace("\"", ""),
            'Service_Action': Service_Action.replace("\"", ""),
            'Service_Reaction': Service_Reaction.replace("\"", "")
        })
        return json.dumps({
            "status": "success",
            "message": "Informations stocked",
        }), 200

@ManageArea.route('/DisplayArea', methods=["POST", "GET"])
def DisplayArea():
    if request.method == "POST":
        data = request.get_json()
        _token = data.get('_token')
        decoded = jwt.decode(_token, "secret", algorithms=["HS256"])
        ALL_INFo = []
        get_email = db.Activation_service.find({"email": decoded["email"]})
        for i in get_email:
            ALL_INFo.append([i['Action'], i['Reaction'], i['Service_Action'], i['Service_Reaction']])
        print ("ALL_INFO=", ALL_INFo)
        if (len(ALL_INFo) != 0):
            return json.dumps({
                "status": "success",
                "message": "List send",
                "info" : ALL_INFo
            }), 200
        else:
            return json.dumps({
                "status": "Error",
            }), 400
        
@ManageArea.route('/DeleteArea', methods=["POST", "GET"])
def DeleteArea():
    if request.method == "POST":
        data = request.get_json()
        Action = data.get('Action')
        Reaction = data.get('Reaction')
        _token = data.get('_token')

        print ("Action= ", Action, "| Reaction=", Reaction, "| _token=", _token)
        decoded = jwt.decode(_token, "secret", algorithms=["HS256"])
        print("decoded =", decoded)
        db.Activation_service.delete_one({"email": decoded["email"], "Action": Action, "Reaction": Reaction})
        if Action == "Un push a été effectué" and Reaction == "Un mail avec les informations du push est envoyé à Gmail":
            return redirect(url_for('Github.logout'))#, (json.dumps({ "status": "success", "message": "Area delete", "route_to_call": "" }), 200)

        return (json.dumps({
            "status": "success",
            "message": "Area delete",
            "route_to_call": ""
        }), 200)
