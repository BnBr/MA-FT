from machine import Pin, Timer
from servomotor import ServoMotor
from array import array
from limitSwitch import LimitSwitch
from smartObject import SmartObject
from functions import Function
from periphals import Periphals
from mqttConnector import MQTTConnector
from temperatureSensor import TemperatureSensor
import time
import pycom
import ujson
import helper
import micropython
from dth import DTH


micropython.alloc_emergency_exception_buf(100)

### Config Topics and Names
serverId = "S1"
gatewayId = "G1"
deviceId = "SM1"
mainTopic = str(serverId + "/" + gatewayId + "/" + deviceId + "/")
deviceName = "SimoneEinsNull"
deviceDescription = "Industriedemonstrator von Benjamin, Jan und Fana fuer Bitnamic"
deviceType = "SMARTOBJECT"

gwName = "Gateway One"
gwLocation = "Osnabrueck"


#MQTT Message Callback Handler
def sub_cb(topic, msg):
    helper.blink(0x00007f) # blink blue on incoming
    print("Got Sub: " + str(topic)[2:-1] + " " + str(msg)[2:-1]) #debug

    topicValues = str(topic)[2:-1].split('/')
    #print(topicValues) #debug
    if topicValues[1]=="MD":
        clientHandler()
    else:
        msgValues = str(msg)[2:-1].split('"')
        if topicValues[3]=="A0":
            actionHandler(msgValues[3], msgValues[7])

def setBusy():
    smObject.setStatus(False)

def setReady():
    smObject.setStatus(True)

def clientHandler():
    time.sleep(0.5)
    initPublish()

##Define Functions
allFunctionsList = list()
allFunctionsList.append(Function("F0", "RESET", "NONE", "0", "1"))
allFunctionsList.append(Function("F1", "Fahre X Achse vom Motor weg", "NONE"))
allFunctionsList.append(Function("F2", "Fahre X Achse zum Motor hin", "NONE"))
allFunctionsList.append(Function("F3", "Fahre X Achse zu Postion", "INTEGER", minVal=0, maxVal=5100))
allFunctionsList.append(Function("F4", "Fahre Y Achse vom Motor weg", "NONE"))
allFunctionsList.append(Function("F5", "Fahre Y Achse zum Motor hin", "NONE"))
allFunctionsList.append(Function("F6", "Fahre Y Achse zu Postion", "INTEGER", minVal=0, maxVal=2250))
allFunctionsList.append(Function("F7", "Fahre Greifarm ein", "NONE"))
allFunctionsList.append(Function("F8", "Fahre Greifarm aus", "NONE"))
allFunctionsList.append(Function("F9", "Hole aus Position 1", "NONE"))
# allFunctionsList.append(Function("F3", "Schalte Licht", "BOOLEAN", "0", "6"))
# allFunctionsList.append(Function("F4", "Hole aus Regalfach", "INTEGER", "0", "6"))
# allFunctionsList.append(Function("F5", "Zeige auf Display an", "STRING", "0", "6"))
# allFunctionsList.append(Function("F6", "Selbstzerstoerung", "NONE", "0", "6"))

def actionHandler(function, parameter):
    mqttClient.pubSMStatus(deviceName, deviceDescription, "BUSY", deviceType)
    print("F: " + function[1:] + " P: " + parameter)
    funcNum = function[1:]
    if funcNum=="0":
        print("Got F0: RESET")
        machine.reset()
    elif funcNum=="1":
        motorX.start(drivingDirectionAwayFromMotor=True)
    elif funcNum=="2":
        motorX.start(drivingDirectionAwayFromMotor=False)
    elif funcNum=="3":
        motorX.startToPosition(int(parameter))
    elif funcNum=="4":
        motorY.start(drivingDirectionAwayFromMotor=True)
    elif funcNum=="5":
        motorY.start(drivingDirectionAwayFromMotor=False)
    elif funcNum=="6":
        motorY.startToPosition(int(parameter))
    elif funcNum=="7":
        motorZ.start(drivingDirectionAwayFromMotor=False)
    elif funcNum=="8":
        motorZ.start(drivingDirectionAwayFromMotor=True)
    elif funcNum=="9":
        motorZ.start(drivingDirectionAwayFromMotor=False)
        motorX.start(drivingDirectionAwayFromMotor=False)
        motorY.start(drivingDirectionAwayFromMotor=False)
        motorX.startToPosition(2730)
        motorY.startToPosition(180)
        motorZ.start(drivingDirectionAwayFromMotor=True)
        motorY.startToPosition(50)
        motorZ.start(drivingDirectionAwayFromMotor=False)
    else:
        print("function not available")
    mqttClient.pubSMStatus(deviceName, deviceDescription, "READY", deviceType)

## CREATE MQTT Instance
mqttClient = MQTTConnector("SMOne", "192.168.0.55", 1888,  None, None, sub_cb, mainTopic)
## Create SmartObject
smOne = SmartObject(deviceId, deviceName, deviceDescription, deviceType, mqttClient)

#Define Motors
motorX = ServoMotor("Motor X", 'G9', 'G8', 5100, counterPIN='G16')
motorY = ServoMotor("Motor Y", 'G7', 'G28', 2250, counterPIN='G17')
motorZ = ServoMotor("Motor Z", 'G22', 'G10', 1)

##Define Sensors
allSensorList = list()
allSensorList.append(Periphals("D0", "Taster X1", "BOOLEAN", "0", "1", mqttClient, thingObject=LimitSwitch('G24', motorX, atMotorSite=True)))
allSensorList.append(Periphals("D1", "Taster X2", "BOOLEAN", "0", "1", mqttClient, thingObject=LimitSwitch('G11', motorX, atMotorSite=False)))
allSensorList.append(Periphals("D2", "Taster Y1", "BOOLEAN", "0", "1", mqttClient, thingObject=LimitSwitch('G12', motorY, atMotorSite=True)))
allSensorList.append(Periphals("D3", "Taster Y2", "BOOLEAN", "0", "1", mqttClient, thingObject=LimitSwitch('G13', motorY, atMotorSite=False)))
allSensorList.append(Periphals("D4", "Taster Z1", "BOOLEAN", "0", "1", mqttClient, thingObject=LimitSwitch('G15', motorZ, atMotorSite=True)))
allSensorList.append(Periphals("D5", "Taster Z2", "BOOLEAN", "0", "1", mqttClient, thingObject=LimitSwitch('G14', motorZ, atMotorSite=False)))
allSensorList.append(Periphals("D6", "Motor X Zaehler", "INTEGER", "0", "5100", mqttClient, thingObject=motorX))
allSensorList.append(Periphals("D7", "Motor Y Zaehler", "INTEGER", "0", "2250", mqttClient, thingObject=motorY))
allSensorList.append(Periphals("D8", "Motor Z Zähler", "INTEGER", "0", "1", smOne)) # TODO evtl nicht functional
allSensorList.append(Periphals("D9", "Temperatur", "DOUBLE", "0", "30", mqttClient, thingObject=TemperatureSensor(15, 25)))


## IF TRUE then CHECK before PUBUPDATE -> FALSE THEN PUBUPDATE ALL
def checkAndPubAllSensors(bool=True):
    if bool:
        for i in range(len(allSensorList)):
            if allSensorList[i].checkSensor():
                print("pubNewSensorData")
                mqttClient.pubData(allSensorList[i])
    else:
        for i in range(len(allSensorList)):
            mqttClient.pubData(allSensorList[i])

def pubAllSensors():
    checkAndPubAllSensors(False)

def pubAllFunctions():
    for i in range(len(allFunctionsList)):
        mqttClient.pubFunc(allFunctionsList[i])

def mqttInit():
    # mqttClient.set_last_will(deviceName,  deviceDescription, deviceType) #TODO
    print("MQTT init")
    mqttClient.connect()
    mqttClient.subscribe(mainTopic + "A0")
    mqttClient.subscribe("S1/MD/#")
    print("MQTT connected!")

def initPublish():
    mqttClient.publishRaw(serverId + "/" + gatewayId, "{\"name\":\"" + gwName + "\",\"location\":\"" + gwLocation + "\"}")  #setting up Gateway
    smOne.setStatus(True) #Publish THIS SmartObject
    #Publish Sensors and Functions
    pubAllSensors()
    pubAllFunctions()
    helper.postingStuff(mqttClient) #for debugging and demonstration

def motorInit():
    print("Init Motor X")
    motorX.start(drivingDirectionAwayFromMotor=False) # to start position
    time.sleep(1)
    motorX.resetCounterToMin()
    print("Init Motor Y")
    motorY.start(drivingDirectionAwayFromMotor=False) # to start position
    time.sleep(1)
    motorY.resetCounterToMin()
    print("Init Motor Z")
    motorZ.start(drivingDirectionAwayFromMotor=False) # to start position
    time.sleep(1)
    motorY.resetCounterToMin()
    print("Init Motor ready")

def timerCheckSensorsCB(alarm):
    #print("check Sensors")
    checkAndPubAllSensors()

def timerInit():
    tim = Timer.Alarm(timerCheckSensorsCB, 1, periodic=True)
    #tim.cancel()

# SETUP
mqttInit()
initPublish()
motorInit()
timerInit()

### LOOP
while True:
    print("I am alive")
    mqttClient.check_msgs()
    time.sleep(1)
    # print("Counter at " + str(motorX.getCounter()))
    # print("Counter at " + str(motorY.getCounter()))
