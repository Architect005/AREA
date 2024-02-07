from flask import Flask, Blueprint, request, json, jsonify
from databse import db
import jwt
import datetime
Signup = Blueprint('Signup', __name__)

@Signup.route('/Register', methods=["POST", "GET"])
def Signup_():
    if request.method == "POST":
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        print ("username:", username, "| password:", password)
        collection = db.get_collection('user')
        get_user = collection.find_one({"username": username})
        get_email = collection.find_one({"email": email})
        if get_user:
            print("Already exist")
            return json.dumps({
                "status": "error",
                "message": "User already exist"
            }), 400
        elif get_email:
            return json.dumps({
                "status": "error",
                "message": "Email already exist"
            }), 400
        else:
            encoded = jwt.encode({'user':username, 'email':email, 'password': password}, "secret", algorithm='HS256')
            refresh_token = jwt.encode({'user':username, 'email':email, 'password': password}, "secret", algorithm='HS256')
            dated = datetime.datetime.utcnow() + datetime.timedelta(hours=2)
            db.user.insert_one({
                'username':username,
                'email':email,
                'password':password,
                'url_image': "https://res.cloudinary.com/dw5omgtiz/image/upload/v1676983401/bm8wzrwgxosyegpoxuzz.png"
            })

            db.All_Tokens.insert_one({
                'token': encoded,
                'refresh_token': refresh_token,
                'expiration_date': dated
            })

            print("encoded:", encoded)
            print("dated:", dated)
            return json.dumps({
                "status": "success",
                "message": "Account created successfully",
                "_token" : encoded
            }), 200
    return 'OK', 200
