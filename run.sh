#!/bin/bash

echo "> Running Python GUI" &
python3 /home/pi/Development/SmartMirror/Main.py &

echo "> Starting Node JS development server" &
( cd /home/pi/Development/SmartMirror/server && xterm -hold -e "node server.js" ) &

echo "> Hosting React client on 192.168.0.32:3000" &
( cd /home/pi/Development/SmartMirror/mirror-client && xterm -hold -e "yarn start" ) &
