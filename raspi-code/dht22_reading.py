# Install the following
    # sudo pip3 install adafruit-circuitpython-dht
    # sudo apt-get install libgpiod2
    # sudo apt-get install python-requests
    # sudo apt-get install adafruit_blinka

import time
import board 
import random
import requests
import json
from datetime import date

import adafruit_dht #

APIaddress = "http://192.168.50.139:5000"
#DHT Connection pin1= '+', pin2 = GPIO4, pin3 = '-'
dhtDevice = adafruit_dht.DHT22(board.D23) 

def randomValue():
    temperature_c = "{0:.2f}".format(random.uniform(29.00, 40.00))
    humidity = "{0:.2f}".format(random.uniform(80.00, 100.00))
    
    return [temperature_c,humidity]

def readht():     

    # Print the values to the serial port
    temperature_c = dhtDevice.temperature
    temperature_f = temperature_c * (9 / 5) + 32
    humidity = dhtDevice.humidity

    return [temperature_c,humidity]

def postData(temperature):
    # post data using request. Other option is using http client  
    
    url = APIaddress + "/api/temperature/add"

    payload = json.dumps({
    "temperature": str(temperature),
    "deviceId": "Raspberry Pi-1",
    "date": str(date.today())
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    #print(response.text)
def updateData(temperature):
    # post data using request. Other option is using http client  
    
    url = "http://192.168.50.198:5000/api/temperature/update/2020001"
    
    url = APIaddress + "/api/temperature/update/2020001"
       
    payload = json.dumps({
    "temperature": str(temperature),
    "deviceId": "Raspberry Pi-1",
    "date": str(date.today())
    })
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data=payload)


while True:
    try:
        data = readht() #[temp, humidity]
        #data = randomValue()
        #print(data)
        
        print(data[0])
        postData(data[0])
      
        time.sleep(.3)
    except RuntimeError as error:
        # Errors happen fairly often, DHT's are hard to read, just keep going
        # print(error.args[0])
        continue

    except Exception as error:
        dhtDevice.exit()
        raise error

