# Smart Mirror Application 

Smart Mirror software designed for raspberry pi utilising a variety of APIs to display news, weather, calendar, todo list & covid information.

The repo is set to run under the directory /pi/home/Development/SmartMirror

The Pi is also configured to run Google Assistant functionality, installed at /home/pi, as described in [this article](https://medium.com/@kevalpatel2106/turn-your-raspberry-pi-into-homemade-google-home-9e29ad220075)

Use ./run.sh to run the application, provided it is installed under the correct directory path.

The application is controlled mainly with Python, using Kivy as a framework to build the UI.
A Javascript client-server service (NodeJS&React) was created to send & receive updates to the todo list on a local network through the pi's IP on port 3000.


Main.py: Python file controlling API calls and functionality behind Smart Mirror GUI.

main.kv: Kivy file responsible for styling, layout and appearance of the application.

server: A node.js server, hosting two endpoints used to pull and push updates to the smart mirror's todo list.

mirror-client: A React JS client  application used to interface with the node server and update the to do list.

