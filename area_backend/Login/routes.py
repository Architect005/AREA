from flask import Flask, Blueprint, request, json, jsonify
from databse import db
import jwt
import datetime
Signin = Blueprint('Signin', __name__)

@Signin.route('/Login', methods=["POST"])
def Signin_():
    if request.method == "POST":
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        print ("email:", email, "| password:", password)
        get_email = db.user.find_one({"email": email})
        if get_email:
            if get_email.get('password') != password:
                print("password incorrect")
                return json.dumps({
                    "status": "error",
                    "message": "User don't exist or password incorrect"
                }), 400
            else:
                all_token = [_tok['token'] for _tok in db.All_Tokens.find()]
                refresh_token = ""
                print("all:", all_token)
                for i in range(len(all_token)):
                    decoded = jwt.decode(all_token[i], "secret", algorithms=["HS256"])
                    if decoded["email"] == email:
                        break
                db.All_Tokens.delete_one({'token': all_token[i]})
                encoded = jwt.encode({'user':decoded["user"], 'email':email, 'password': password}, "secret", algorithm='HS256')
                refresh_token = jwt.encode({'user':decoded["user"], 'email':email, 'password': password}, "secret", algorithm='HS256')
                dated = datetime.datetime.utcnow() + datetime.timedelta(hours=2)
                db.All_Tokens.insert_one({
                    'token': encoded,
                    'refresh_token': refresh_token,
                    'expiration_date': dated
                })

                return json.dumps({
                    "status": "success",
                    "message": "Account created successfully",
                    "_token": refresh_token
                }), 200
                    
                # date_now = datetime.datetime.utcnow()
        else:
            print("User don't exist")
            return json.dumps({
                "status": "error",
                "message": "User don't exist or password incorrect"
            }), 400
        

