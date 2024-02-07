import os
import io
import jwt
import uuid
import msal
import hmac
import json
import base64
import hashlib
import asyncio
import requests
from Crypto.Cipher import AES
from msal import ClientApplication
from msgraph import GraphServiceClient
from msgraph import GraphRequestAdapter
from msal import PublicClientApplication
from datetime import datetime, timedelta
from O365 import Account, MSGraphProtocol
from azure_ad_verify_token import verify_jwt
from werkzeug.exceptions import HTTPException
from cryptography.hazmat.primitives import hashes
from azure.identity.aio import ClientSecretCredential
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives.asymmetric.rsa import RSAPublicNumbers
from flask import Flask, Response, request, redirect, jsonify, make_response, Blueprint, session
from kiota_authentication_azure.azure_identity_authentication_provider import AzureIdentityAuthenticationProvider


CLIENT_ID = 'd7de0e49-ea45-4fe4-87f4-f5f0eb2cf595'
SECRET_ID = 'QaI8Q~o5jLpP0-SDG2OdZHqh65EVGECTp6z2Adzl'
AUTHORITY = "https://login.microsoftonline.com/common"
REDIRECT_URI= "https://area-backend-v1.azurewebsites.net/outlook_auth"
SCOPE = ["https://graph.microsoft.com/.default"]
#['Calendars.Read', 'Files.ReadWrite']
scopes = ["https://graph.microsoft.com/.default"]
API_ENDPOINT = "https://graph.microsoft.com/v1.0"
azure_ad_issuer = 'https://ugrose.b2clogin.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/v2.0/'
azure_ad_jwks_uri = 'https://login.microsoftonline.com/common/discovery/keys'
global real_token
global id_token

OutlookCal = Blueprint('OutlookCal', __name__)


def load_cache():
    cache = msal.SerializableTokenCache()
    if  session.get("token_cache"):
         cache.deserialize(session["token_cache"])
    return cache

def build_msal_app(cache=None, authority=None):
    return msal.ConfidentialClientApplication(
        CLIENT_ID, authority=authority or AUTHORITY,
        client_credential=SECRET_ID, token_cache=cache)

def build_auth_url(authority=None, scopes=None):
    return build_msal_app(authority=authority).get_authorization_request_url(
        scopes or [],
        redirect_uri=REDIRECT_URI)

def get_token_from_cache(scope=None):
    cache = load_cache()  # This web app maintains one cache per session
    cca = build_msal_app(cache=cache)
    accounts = cca.get_accounts()
    if accounts:  # So all account(s) belong to the current signed-in user
        result = cca.acquire_token_silent(scope, account=accounts[0])
        return result

@OutlookCal.route("/homepage", methods=['POST', 'GET'])
def root():
    #result = dict()
    #app = PublicClientApplication(client_id=CLIENT_ID, authority=AUTHORITY)
    #result = app.acquire_token_silent(scopes=SCOPE, account=None)
    #if not result:
    auth_url = build_auth_url(scopes=SCOPE)
    return redirect(auth_url)
    #return 'OK', 200
#
#
@OutlookCal.route("/outlook_auth", methods=['POST', 'GET'])
def outlook_auth():
    global real_token
    global real_id
    code = request.args.get("code")
    state = request.args.get("state")
    if code:
        cache = load_cache()
        cca = build_msal_app(cache=cache)
        result : dict = cca.acquire_token_by_authorization_code(
            code,
            scopes=SCOPE,
            redirect_uri=REDIRECT_URI)
        print("result: ", result)
        if "error" in result:
            return 'Fail', 400
        token_to_encode : dict = result["id_token_claims"]
        print("token_to", type(token_to_encode))
        accounts = cca.get_accounts()
        token = cca.acquire_token_silent(SCOPE,account=accounts[0])
        print("token: ", token)
        real_token = token["access_token"]
    else:
        print("NO CODE GIVEN BY MICROSOFT")
        return "Fail", 400
    try :
        print("token_to_encode: ", token_to_encode)
        email = token_to_encode["preferred_username"]
        username = token_to_encode["name"]
        tid = token_to_encode["tid"]
        real_id = tid
    except:
        #raise HTTPException(status_code=400, detail="Unsupported Email ID")
        return 'HUM', 400
    #return render_template("microsoft_proxy.html", redirect_url=state, token=real_token, username=username, email=email)
    return 'OK', 200
#
##à appeler juste après que l'utilisateur se soit authentifié
@OutlookCal.route("/add-microsoft-cookie", methods=["POST"])
def add_microsoft_cookie():
    token = request.form["sub"]
    response = jsonify({"access_token": token, "token_type": "bearer"})

    response.set_cookie(
        key="Authorization",
        value=f"Bearer {token}",
        domain="localhost",
        httponly=True,
        max_age=3600,
        expires=3600,
    )
    return response

#Decrypt the symmetric key and Compare data signature using HMAC-SHA256
def decrypt_response(response):
    value = response["value"]
    val = value[0]["encryptedContent"]
    dataKey = val["dataKey"]
    base64encodedKey = base64.b64decode(dataKey)
    asymetricPrivateKey = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048
    )
    decryptedSymmetricKey = asymetricPrivateKey.decrypt(
    base64encodedKey,
    padding.OAEP(mgf=padding.MGF1(algorithm=hashes.SHA256()),
                 algorithm=hashes.SHA256(),
                 label=None)
    )
    base64encodedSignature = val["dataSignature"]
    encryptedPayload = val["data"]
    actualSignature = hmac.new(decryptedSymmetricKey, encryptedPayload, hashlib.sha256).digest()
    if actualSignature == base64encodedSignature:
        #Decrypt the resource data content
        iv = bytes([0] * 16)
        iv[:len(decryptedSymmetricKey[:16])] = decryptedSymmetricKey[:16]
        decipher = AES.new(decryptedSymmetricKey, AES.MODE_CBC, iv)
        decryptedPayload = decipher.decrypt(base64.b64decode(encryptedPayload)).decode('utf-8')
        print("data received: ", decryptedPayload)
    else:
        pass

#Webhook Outlook Calendar for modifications in calendar
@OutlookCal.route("/notifications", methods=['POST', 'GET'])
def outlookcal_notifications():
    res = None
    if request.method == "GET":
        global real_id
        global real_token
        now = datetime.utcnow()
        expirationDate = now + timedelta(days=2)
        url = "https://graph.microsoft.com/beta/subscriptions"
        request_headers = {'Authorization': 'Bearer ' + real_token,
                           'Content-Type': 'application/json'}
        with open('./AreaAppCertificate_49fb2aeb94bb4495899a05ffa24ab0a6.cer', 'r') as fd:
            certificateContent = fd.read()
        data = {
            "changeType": "created,updated",
            "notificationUrl": "https://area-backend-v1.herokuapp.com/notifications",
            #"resource": "/me/events/users/%s/events"%(real_id),
            "resource": "/me/events?$select=body,organizer,attendees",
            "clientState": "QaI8Q~o5jLpP0-SDG2OdZHqh65EVGECTp6z2Adzl",
            "includeResourceData": True,
            "expirationDateTime": expirationDate.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "encryptionCertificate": f'{base64.b64encode(certificateContent.encode()).decode()}',
            #"encryptionCertificateId": "https://areaappkey.vault.azure.net/certificates/AreaAppCertificate/49fb2aeb94bb4495899a05ffa24ab0a6"
            "encryptionCertificateId": "b4ec5b20-c304-436c-9172-32cc57ae755a"
        }
        response = requests.post(url, headers=request_headers, data=json.dumps(data))
        print("response: ", response.json())
        res = response.json()
        # decrypt_response(response)
    if request.method == "POST":
        if request.args["validationToken"]:
            validation_token = request.headers.get("validationToken")
            # payload = verify_jwt(
            # token=request.args["validationToken"],
            # valid_audiences=[f'{CLIENT_ID}'],
            # issuer=azure_ad_issuer,
            # jwks_uri=azure_ad_jwks_uri,
            # verify=True,
            # )
            print("header:", request.headers)
            #print("validationToken",request.args["validationToken"])
            #return Response(response=validation_token, status=200, mimetype='text/plain')
            #return Response(status=200, content_type='text/plain', response=request.args["validationToken"].split(' ')[-1])
            return request.args["validationToken"], 200
        decrypt_response(res)
        print(request.args)
    return 'Accepted', 200

#save a file in microsoft drive
def save_file(file):
    global real_token
    request_headers = {'Authorization': 'Bearer '+ real_token}
    filename = os.path.basename(file)
    with open(file, 'rb') as upload:
        media_content = upload.read()
    response = requests.put(
        API_ENDPOINT + f'/me/drive/items/root:/{filename}:/content',headers=request_headers, data=media_content
    )
    print(response.json())


