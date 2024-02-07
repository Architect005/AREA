import time

ABOUT_JSON = {
    "client": {
        "host": ""
    },
    "server": {
        "current_time": int(time.time()),
        "services": [
            {
                "name": "Github",
                "actions": [
                    {
                        "name": "push_done",
                        "description": "A push is done on the repository",                    
                    }, {
                        "name": "issues_done",
                        "description": "An issue is done on the repository",      
                    }
                    ],
                "reactions": [
                    {
                        "name": "receive_mail",
                        "description": "A new mail with informations is sent on Gmail"
                    }
                ]
            },
            {
               "name": "Youtube",
                "actions": [
                    {
                        "name": "upload_video",
                        "description": "A video is uploaded on your youtube channel",                    
                    }, {
                        "name": "updates_video's_tittle",
                        "description": "A video's tittle is updated on your youtube channel",      
                    }, {
                        "name": "updates_description",
                        "description": "A description is updated on your youtube channel",      
                    }
                    ],
                "reactions": [
                    {
                        "name": "send_mail_to_you",
                        "description": "A new mail with informations is sent on Gmail"
                    }, {
                        "name": "send_mail_to_other_people",
                        "description": "A new mail with informations is sent to other people on Gmail"
                    }
                ]
            },
            {
               "name": "Google Calendar",
                "actions": [
                    {
                        "name": "calendar_modified",
                        "description": "Your calendar has been modified by another person",                    
                    }
                    ],
                "reactions": [
                    {
                        "name": "confirmation_of_receipt",
                        "description": "A confirmation of receipt is sent to the person on Gmail"
                    }
                ]
            },
            {
               "name": "Microsoft One Drive",
                "actions": [],
                "reactions": [
                    {
                        "name": "file_uploading",
                        "description": "Uploading a receive file to microsoft one drive"
                    }
                ]
            },
            {
               "name": "Gmail",
                "actions": [
                    {
                        "name": "attached_file",
                        "description": "A mail with an attached file is reveived",                    
                    }, {
                        "name": "important_mail",
                        "description": "An important mail is received",
                    }
                    ],
                "reactions": [
                    {
                        "name": "file_saved",
                        "description": "The attached file received is saved on microsoft one drive"
                    }, {
                        "name": "reminder_created",
                        "description": "A reminder to answer to mails is created on Google Calendar"
                    }
                ]
            },
        ]
    }
}