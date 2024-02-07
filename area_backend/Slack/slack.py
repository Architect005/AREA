#!/usr/bin/env python
# encoding: utf-8

# Slack credentials
# App ID: A04S2DJG2KH
# Client ID: '4897994293925.4886460546663'
# Client Secret: '041136528679bf3ca12475b02e063f89'
# Signing Secret: '65afb3156e080c16ac5afdbf120de521'
# Verification token: 'sK9O7kixSrXHoI0CoIQXeKIT'

import os
from slack_sdk.oauth import AuthorizeUrlGenerator
from slack_sdk.oauth.installation_store import FileInstallationStore, Installation
from slack_sdk.oauth.state_store import FileOAuthStateStore
from slack_sdk.web import WebClient
from flask import Blueprint, request, make_response

state_store = FileOAuthStateStore(expiration_seconds=300, base_dir="./data")

# Build https://slack.com/oauth/v2/authorize with sufficient query parameters
authorize_url_generator = AuthorizeUrlGenerator(
    client_id="4897994293925.4886460546663",
    scopes=["app_mentions:read", "chat:write"],
    user_scopes=["search:read"],
)
client_id="4897994293925.4886460546663"
client_secret = "041136528679bf3ca12475b02e063f89"
Slack = Blueprint('Slack', __name__)

@Slack.route("/slack_login", methods=["GET"])
def oauth_start():
    # Generate a random value and store it on the server-side
    state = state_store.issue()
    # https://slack.com/oauth/v2/authorize?state=(generated value)&client_id={client_id}&scope=app_mentions:read,chat:write&user_scope=search:read
    url = authorize_url_generator.generate(state)
    return url, 200

# Redirect URL
@Slack.route("/slack_callback", methods=["GET"])
def oauth_callback():
    # Retrieve the auth code and state from the request params
    if "code" in request.args:
        # Verify the state parameter
        if state_store.consume(request.args["state"]):
            client = WebClient()  # no prepared token needed for this
            # Complete the installation by calling oauth.v2.access API method
            oauth_response = client.oauth_v2_access(
                client_id=client_id,
                client_secret=client_secret,
                redirect_uri="https://area-backend-v1.herokuapp.com/slack_callback",
                code=request.args["code"]
            )
            access_token = oauth_response['access_token']
            client = WebClient(token=access_token)
            user_id = oauth_response['user_id']
            response = client.users_info(user=user_id)
    print(response)
    return 'OK', 200