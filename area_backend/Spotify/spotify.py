#!/usr/bin/env python
# encoding: utf-8


from flask import Flask, jsonify, request, redirect, url_for, Blueprint
import requests
import json
import random
import urllib.parse
import base64
import about
from flasgger import Swagger, swag_from

Spotify = Blueprint('Spotify', __name__)
# swagger = Swagger(Spotify)

client_id = '51795652891c42b6a69361557b6a9b3a'
client_secret = '45d035c42a1d4daa8c0b1c54ae4557f8'
redirect_uri = 'https://area-backend-v1.herokuapp.com/fetch_token'
#redirect_uri = 'http://127.0.0.1:5000/fetch_token'

global my_token

@Spotify.route('/')
def index():
    """Home endpoint returning keyword
    In this example the specification is taken from external YAML file
    ---
    responses:
        200:
            description: A home keyword
    """
    print("here")
    return 'Home', 200


###############################spotify##################################################
def create_random_string():
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    new_string = []
    r = len(alphabet)
    for _ in range(16):
        p = random.randint(0, r-1)
        new_string.append(alphabet[p])
    return new_string

#se connecter à spotify et récupérer les informations de l'utilisateur
@Spotify.route('/connect_spotify', methods=['GET'])
def connect_spotify():
    state = create_random_string()
    scope = 'user-read-private user-read-email playlist-read-collaborative app-remote-control user-modify-playback-state user-read-playback-state'
    authorization_url = "https://accounts.spotify.com/authorize?"
    PARAMS = {
        'redirect_uri': redirect_uri,
        'scope': scope,
        'state': state,
        'response_type': 'code',
        'client_id': client_id
    }
    return redirect(authorization_url + urllib.parse.urlencode(PARAMS))


#récupérer les tokens d'accès
@Spotify.route('/fetch_token', methods=['POST', 'GET'])
def fetch_access_token():
    global my_token
    #if request.method == 'POST':
    code = request.args.get('code') or None
    state = request.args.get('state') or None
    #si state
    if state is None:
        #s'il y a erreur, rediriger sur une url corrrespondante
        query_params = {'error': 'state_mismatch'}
        query_string = urllib.parse.urlencode(query_params)
        redirect('/#' + query_string)
    else:
        #si c'est bon, s'autoriser
        token_url = 'https://accounts.spotify.com/api/token'
        userpass = client_id + ':' + client_secret
        encoded_u = base64.b64encode(userpass.encode()).decode()
        headers = {"Authorization" : "Basic " + encoded_u}
        data = {
            'code': code,
            'redirect_uri': redirect_uri,
            'grant_type': 'authorization_code'
        }
        response = requests.post(token_url, headers=headers, data=data)
        print(json.loads(response.text))

        if response.status_code == 200:
            #d = request.data
            access_token = response.json()['access_token']
            refresh_token = response.json()['refresh_token']
            my_token = access_token
            print('access:', access_token)
            print('refresh:', refresh_token)
            url =  'https://api.spotify.com/v1/me'
            headers = {'Authorization': 'Bearer ' + access_token}
            #use the access token to access the Spotify Web API
            r = requests.get(url = url, headers=headers)
            print(r.text)
            #we can also pass the token to the browser to make requests from there
            redirect('/#' + urllib.parse.urlencode({'access_token': access_token,'refresh_token': refresh_token}))

        else:
            #transform a python dictionary into a string to query with urllib.parse.urlencode and then redirect an error link
            redirect('/#' + urllib.parse.urlencode({'error': 'invalid_token'}))
    return 'OK', 200

#recupérer les refresh tokens
@Spotify.route('/refresh_token_spotify', methods=['POST', 'GET'])
def refresh_token():
    global my_token
    if 'refresh_token' in request.args:
        refresh_token = request.args.get('refresh_token')
        token_url = 'https://accounts.spotify.com/api/token'
        userpass = client_id + ':' + client_secret
        encoded_u = base64.b64encode(userpass.encode()).decode()
        headers = {"Authorization" : "Basic " + encoded_u}
        data = {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token
        }
        response = requests.post(token_url, headers=headers, data=data)
        if (response.status_code == 200):
            access_token = response.json()['access_token']
            my_token = access_token
    return 'OK', 200


#retrouver et jouer un son
@Spotify.route('/search_and_play', methods=['GET', 'POST', 'PUT'])
def search_and_play(track, artist):
    global my_token
    #track = 'Démons'
    #artist = ['Angèle']
    url = 'https://api.spotify.com/v1/search'
    headers = {'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + my_token
            }
    #le message doit venir sous forme 'track_name' de 'nom' + 'prénom'
    q = str()
    if (len(artist) == 1):
        q = 'remaster%20track:{track_name}%20artist:{name1}'.format(track_name = track, name1 = artist[0])
    if (len(artist) == 2):
        q = 'remaster%20track:{track_name}%20artist:{name1}%20{name2}'.format(track_name = track, name1 = artist[0], name2 = artist[1])
    params = {'q': q, 'type': 'track,artist'}
    response = requests.get(url = url, params=params, headers=headers)
    print('response', response)
    if response.status_code == 200:
        my_track = response.json()['tracks']['items']
        song = my_track[0]['external_urls']['spotify']
        print('my_track', song)
        print('song:', song[31:])

        #jouer un son

        p_url = 'https://api.spotify.com/v1/me/player/play'
        p_params = {'device_id': '1cf634b738acab3536e6afa943d5b95868dd48b2'}
        p_headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + my_token
            }
        uris = "spotify:track:" + song[31:]
        p_datas = {
                    'uris': [uris],
                   }
        print('I came that far', p_datas)
        play_request = requests.put(p_url,json=p_datas, params=p_params, headers=p_headers)
        print('response status:', play_request.text)
    return 'OK', 200
