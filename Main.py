#! /usr/bin/env python3
from __future__ import print_function
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from kivy.app import App
from kivy.uix.gridlayout import GridLayout
from kivy.uix.button import Button
from kivy.core.window import Window
from kivy.uix.label import Label
from datetime import date, datetime
import calendar
from kivy.uix.widget import Widget
from kivy.properties import StringProperty, ObjectProperty, ListProperty
from datetime import timedelta
from kivy.clock import Clock
from kivy.lang import Builder
from kivy.uix.screenmanager import ScreenManager, Screen
import requests
import json
from kivy.uix.textinput import TextInput
from kivy.uix.recycleview import RecycleView
from kivy.core.window import Window
from keys import *

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

Window.fullscreen = True

today = date.today()

dateTimeMessage = str(calendar.day_name[today.weekday()]) + ", " + str(today.strftime("%B")) + " " + str(today.day)

# ---- User info ---- 
user = "Tom"

# ----  Weather API ---- 
url = "https://community-open-weather-map.p.rapidapi.com/weather"
querystring = {"id":"2172797","units":"%22metric%22 or %22imperial%22","mode":"xml%2C html","q":"Ashbourne,ie"}

headers = {
    'x-rapidapi-host': "community-open-weather-map.p.rapidapi.com",
    'x-rapidapi-key': weatherApiKey
    }



def configure_greeting_message(hour):
    if hour >= 6 and hour < 12:
        return "Good morning, " + user
    if hour >= 12 and hour < 18:
        return "Good afternoon, " + user
    if hour >= 18 and hour < 21:
        return "Good evening, " + user
    else:
        return "Good night, " + user

hour = str(datetime.now())[11:13].strip()

class MainWindow(Screen):
    pass


class WindowManager(ScreenManager):
    pass

class MyMainApp(App):
    # Greeting Label
    greetMsg = str(configure_greeting_message(int(hour)))
    greetingLabel = StringProperty(greetMsg)
    
    # Weather
    weather_icon = StringProperty("")
    description = StringProperty("")
    temp = StringProperty("")

    # News
    news_icon = StringProperty("")
    news_headlines = StringProperty("")

    # Date-time stuff 
    time = StringProperty("")
    dateTimeLabel = StringProperty(dateTimeMessage)

    # Google calendar
    upcomingEvents = StringProperty("")

    todoList = StringProperty("")
    
    def build(self):
        # Update the clock every minute
        Clock.schedule_interval(self.update_clock, 60)
        self.time = datetime.now().strftime("%-I:%M %p") #time

        self.get_weather_data() # weather
        self.get_headlines() # news
        self.get_calendar_events() # events
        self.read_todo_list() # todo list
        
        # --- Updates ---
        Clock.schedule_interval(self.get_weather_data, 7200) # every 2 hrs
        Clock.schedule_interval(self.get_headlines, 7200)
        Clock.schedule_interval(self.get_calendar_events, 28800) # every 8 hrs
        Clock.schedule_interval(self.read_todo_list, 3600)
        
        kv = Builder.load_file("main.kv")
        return kv
    
    def update_clock(self, *args):
        self.time = datetime.now().strftime("%-I:%M %p")

    def get_weather_data(self, *args):
        response = requests.request("GET", url, headers=headers, params=querystring)
        data = response.json()

        icon = data["weather"][0]["icon"]
        self.description = data["weather"][0]["description"]
        self.temp = str(round(data["main"]["temp"] - 273.15, 2)) + " C"
        self.weather_icon = "http://openweathermap.org/img/wn/%s@2x.png"%icon

    def get_headlines(self, *args):
        url = ('http://newsapi.org/v2/top-headlines?'
       'sources=bbc-news&'
       'pageSize=3&'
       'apiKey=' + newsApiKey)
        self.news_icon = "/home/pi/Development/SmartMirror/news_icon.png"
        response = requests.get(url)
        data = response.json()
        self.news_headlines =  " • " + data["articles"][0]["title"] + "\n •  " + data["articles"][1]["title"] + "\n •  " + data["articles"][2]["title"]

    def read_todo_list(self, *args):
        d = os.getcwd()
        os.chdir("/home/pi/Development/SmartMirror/server")

        f = open(os.getcwd() + "/todo.txt", "r")
        readFile = f.read()
        self.todoList = "• Todo •\n" + readFile.replace(",", "\n")
        os.chdir("/home/pi")
    
    def get_calendar_events(self, *args):
        creds = None
        # The file token.pickle stores the user's access and refresh tokens, and is
        # created automatically when the authorization flow completes for the first
        # time.
        if os.path.exists('token.pickle'):
            with open('token.pickle', 'rb') as token:
                creds = pickle.load(token)
        # If there are no (valid) credentials available, let the user log in.
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    '/home/pi/Development/SmartMirror/credentials.json', SCOPES)
                creds = flow.run_local_server(port=0)
            # Save the credentials for the next run
            with open('token.pickle', 'wb') as token:
                pickle.dump(creds, token)

        service = build('calendar', 'v3', credentials=creds)

        # Call the Calendar API
        now = datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time
        events_result = service.events().list(calendarId='primary', timeMin=now,
                                            maxResults=5  , singleEvents=True,
                                            orderBy='startTime').execute()
        events = events_result.get('items', [])

        if not events:
            print('No upcoming events found.')
        for event in events:
            start = event['start'].get('dateTime', event['start'].get('date'))
            start_str = datetime.strptime(start[0:19], "%Y-%m-%dT%H:%M:%S")
            self.upcomingEvents = self.upcomingEvents + str(start_str.strftime("%b %d %H:%M")) + " • " + event['summary'] + "\n"
        
        
if __name__ == "__main__":
    MyMainApp().run()
