Smart Mirror Application & Home Web Server
===

Custom built Smart Mirror software designed for raspberry pi utilising a variety of APIs to display news, weather, calendar, todo list & covid-19 information.

Inspiration was taken from posts like [this](https://www.instructables.com/How-to-Build-a-Raspberry-Pi-Smart-Mirror/) 

Setup
---
Simply use `./run.sh` from within the repo to run the different components of the project. 

Components 
---
The Main.py and main.kv are responsible for the handling of the Mirror's display. The Kivy GUI framework for Python is responsible for controlling the design of the display, while the API calls and data handling is done with Python. 

'Home Web server' 
---
I decided to incorporate a web server, running Node JS with a ReactJS client on the pi along side the mirror. 
The `/mirror-client` & `/server` directories run a web page accessible through my home network, hosting a todo-list and a fitness stat tracker
The server then communicates this information to the python process, which displays my todo list and fitness stats for each week on the mirror display. 

Google Assistant
---
The Pi is also configured to run Google Assistant functionality, installed at /home/pi, as described in [this article](https://medium.com/@kevalpatel2106/turn-your-raspberry-pi-into-homemade-google-home-9e29ad220075)

After some crude woodwork and the purchasing of a [two way mirror](https://www.amazon.co.uk/gp/product/B01MSJQLUL/ref=ppx_yo_dt_b_asin_title_o05_s00?ie=UTF8&psc=1), I got the rough semblance of a Smart mirror put together:

![](https://github.com/thomaskelly97/SmartMirror/blob/master/resources/mirror_left.jpg)

![](https://github.com/thomaskelly97/SmartMirror/blob/master/resources/mirror_right.jpg)

