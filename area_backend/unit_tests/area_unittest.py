#!/usr/bin/env python
# encoding: utf-8

import unittest
import json
from app import app

class FlaskTest(unittest.TestCase):    
    def setUp(self):
        self.app = app.test_client()

    def test_successful_login(self):
        payload = json.dumps({
            "email": "yanntossou@gmail.com",
            "password": "papa"
        })
        response = self.app.post('/Login', headers={"Content-Type": "application/json"}, data=payload)
        self.assertEqual(200, response.status_code)
        
    def test_bad_login(self):
        payload = json.dumps({
            "email": "96560024",
            "password": "0000fcycfv00"
        })
        response = self.app.post('/Login', headers={"Content-Type": "application/json"}, data=payload)
        self.assertEqual(400, response.status_code)

    def test_successful_register(self):
        payload = json.dumps({
            "username": "Terriblous",
            "email": "yanntossou@gmail.com",
            "password": "papa"
        })
        response = self.app.post('/Register', headers={"Content-Type": "application/json"}, data=payload)
        self.assertEqual(400, response.status_code)
    
    def test_bad_register(self):
        payload = json.dumps({
              "username": "DIM3",
              "email": "string33@gmail.com",
              "password": "333333"
        })
        response = self.app.post('/Register', headers={"Content-Type": "application/json"}, data=payload)
        self.assertEqual(400, response.status_code)

if __name__ == '__main__':
    unittest.main()