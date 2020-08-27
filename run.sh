#!/bin/bash

python3 /home/pi/Development/SmartMirror/Main.py &

( cd /home/pi/Development/SmartMirror/server && xterm -hold -e "node server.js" ) &

( cd /home/pi/Development/SmartMirror/mirror-client && xterm -hold -e "yarn start" ) &

( cd /home/pi && xterm -hold -e "sh google-assistant-init.sh" )
