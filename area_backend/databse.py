from flask import Flask
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask_caching import Cache
app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})
app.config["SECRET_KEY"] = "050db1ad24c535f2396ddcb303f0a18d5ddc1c73"
app.secret_key = "050db1ad24c535f2396ddcb303f0a18d5ddc1c73"
app.config["MONGO_URI"] = "mongodb+srv://admin:123456789azerty@cluster0.zye9n45.mongodb.net/user_management"
app.config['SESSION_TYPE'] = 'filesystem'
app.debug = True

mongodb_client = MongoClient("mongodb+srv://admin:123456789azerty@cluster0.zye9n45.mongodb.net/")
db = mongodb_client['user_management']