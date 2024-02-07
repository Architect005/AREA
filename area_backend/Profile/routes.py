from flask import Flask, Blueprint, request, json, jsonify
from databse import db
import jwt
import datetime
Profile = Blueprint('Profile', __name__)

@Profile.route('/ChangeInfo', methods=["POST", "GET"])
def Profile_():
    if request.method == "POST":
        data = request.get_json()
        username = data.get('username')
        name = data.get('name')
        url_image = data.get('url_image')
        Oldpassword = data.get('Oldpassword')
        Newpassword = data.get('Newpassword')
        get_username = db.user.find_one({"username": username})
        print("url:", url_image)
        if url_image != "":
            db.user.update_one({"username": name}, {"$set": {"url_image": url_image}})
        else:
            get_url = db.user.find_one({"username": name})
            url_image = get_url.get('url_image')
        if get_username:
            print("User exist")
            return json.dumps({
                "status": "error",
                "message": "User already exist"
            }), 400
        else:
            if Oldpassword == "" and Newpassword == "":
                return json.dumps({
                    "status": "success",
                    "message": "All information are stocked",
                }), 200
            else:
                get_name = db.user.find_one({"username": name})

                if get_name.get('password') != Oldpassword:
                    print ("Wrong password")
                    return json.dumps({
                        "status": "error",
                        "message": "Wrong password"
                    }), 400
                else:
                    db.user.update_one({"username": name}, {"$set": {"password": Newpassword}})
            
        print ("username:", username, "| Oldpassword:", Oldpassword, "| Newpassword:", Newpassword)
    return json.dumps({
        "status": "success",
        "message": "All information are stocked",
        # "url_image": url_image
    }), 200