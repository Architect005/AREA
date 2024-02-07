import json
import base64
import random
import requests
import requests.auth
import urllib.parse
from uuid import uuid4
from flask import Flask, jsonify, request, redirect, url_for, Blueprint

Reddit = Blueprint('Reddit', __name__)

CLIENT_ID =  "tEDDzr6GfT9sY-IfpN-o8A"
CLIENT_SECRET = "eJvR0TS8Des9D3eGhkeQ05lExnBADw"
REDIRECT_URI = "https://area-backend-v1.herokuapp.com/reddit_callback"

user_token = ""

def build_auth_url():
    global user_token
    state = str(uuid4())
    params = {"client_id": CLIENT_ID,
              "response_type": "code",
              "state": state,
              "redirect_uri": REDIRECT_URI,
              "duration": "temporary",
              "scope": "identity"}
    url = "https://ssl.reddit.com/api/v1/authorize?" + urllib.parse.urlencode(params)
    return redirect(url)

@Reddit.route('/reddit_callback', methods=['POST', 'GET'])
def reddit_callback():
    error = request.args.get('error', '')
    if error:
        return "Error: " + error
    state = request.args.get('state') or None
    if state is None:
        #s'il y a erreur, rediriger sur une url corrrespondante
        query_params = {'error': 'state_mismatch'}
        query_string = urllib.parse.urlencode(query_params)
        redirect('/#' + query_string)
    code = request.args.get('code')
    access_token = get_token(code)
    user_token = access_token
    # Note: In most cases, you'll want to store the access token, in, say,
    # a session for use in other parts of your web app.
    return 'OK', 200
    #return "Your reddit username is: %s" % get_username(access_token)

def get_token(code):
    client_auth = requests.auth.HTTPBasicAuth(CLIENT_ID, CLIENT_SECRET)
    post_data = {"grant_type": "authorization_code",
                 "code": code,
                 "redirect_uri": REDIRECT_URI}
    headers = {"User-Agent" : 'area_epitech'}
    response = requests.post("https://ssl.reddit.com/api/v1/access_token",
                             auth=client_auth,
                             headers=headers,
                             data=post_data)
    token_json = response.json()
    return token_json["access_token"]


#get new posts in our selected subreddits
#on doit fetch les subreddits auxquels l'utilisateur est abonné

@Reddit.route('/subreddit_list', methods=['POST', 'GET'])
def subreddit_list():
    request_headers = {'Authorization': 'Bearer ' + user_token}
    res = requests.get("https://oauth.reddit.com/subreddits/mine/subscriber",
                   headers=request_headers)
    print(res.json())
    #let's set a variable for the subreddits
    subreddits = []
    #parcourir tous les subreddits
    for sub in subreddits:
        url = "https://oauth.reddit.com/r/" + sub + "/new"
        res = requests.get(url, headers=request_headers)
    return 'OK', 200
