from flask import Flask, Blueprint, request, json, jsonify
from databse import db
import jwt
import datetime
Token = Blueprint('Token', __name__)

@Token.route('/Token', methods=["POST"])
def Token_():
    if request.method == "POST":
        data = request.get_json()
        _token = data.get('token')
        get_token = db.All_Tokens.find_one({"token": _token})
        if get_token:
            # print (get_token.get('expiration_date'))
            if get_token.get('expiration_date') < datetime.datetime.utcnow():
                # print ("Token expired")
                return json.dumps({
                    "status": "success",
                    "message": "Token expired",
                }), 400
            else:
                decoded = jwt.decode(_token, "secret", algorithms=["HS256"])
                # print ("_token:", _token)
                # print ("_token_decoded:", decoded)
                get_url = db.user.find_one({"username": decoded["user"]})
                return json.dumps({
                    "status": "success",
                    "message": "Valid token",
                    "username": decoded["user"],
                    "url_image": get_url.get('url_image')
                }), 200
        else:
            print ("Error")
            return json.dumps({
                "status": "error",
                "message": "Token don't exist",
             }), 400


