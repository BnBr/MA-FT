from mqtt import MQTTClient
import helper
import pycom
from machine import Timer

class MQTTConnector:

    #MQTT Message Callback Handler
    def sub_cb(self, topic, msg):
        #debugprint
        print("raw" + str(topic) + str(msg))
        self.publish("log", "yes, i got here")
        self.publish("log", str(topic) + str(msg))

    def __init__(self, name, server, port, user, password, callbackMethod, mainTopic):
        self.client = MQTTClient(name, server, port=port,  user=user,  password=password)
        self.client.set_callback(callbackMethod)
        self.mainTopic = mainTopic

    def connect(self):
        self.client.connect()

    def disconnect(self):
        self.client.disconnect()

    def subscribe(self, topic):
        self.client.subscribe(topic)

    def settimeout(self, duration):
        print("settimeout: " + duration)
        time.sleep(duration)

    def check_msgs(self):
        self.client.check_msg()

    def set_last_will(self, name, desc, type):
        self.client.set_last_will(self.mainTopic + "I0", generateJSONstatus(name, desc, "OFFLINE", type))

    def publish(self, topic, message):
        self.client.publish(self.mainTopic + str(topic), str(message))
        helper.blink(0x007f00) # blink green on outgoing

    def publishRaw(self, topic, message):
        self.client.publish(str(topic), str(message))
        helper.blink(0x007f00)

    def pubLog(self, message):
        self.client.publish(self.mainTopic + "log", str("Debug: " + str(message)))
        helper.blink(0x007f00) # blink green on outgoing

    def reconnect(self):
        self.client.disconnect()
        self.client.connect()

    def pubSMStatus(self, name, description, status, type, topic="I0"):
            self.publish(topic, generateJSONstatus(name, description, status, type))

    def pubData(self, object):
        self.publish(object.getId(), generateJSONWithMinMaxValue(str(object.getName()),str(object.getParameterType()),str(object.getMinVal()),str(object.getMaxVal()),str(object.getValue())))

    def pubFunc(self, object):
        self.publish(object.getId(), generateJSONWithMinMax(str(object.getName()),str(object.getParameterType()),str(object.getMinVal()),str(object.getMaxVal())))

def generateJSON(name, parameter_type):
    return "{\"name\":\"" + str(name) + "\",\"parameter_type\":\"" + str(parameter_type) + "\"}"

def generateJSONWithMinMax(name, parameter_type, minVal, maxVal):
    return generateJSON(name, parameter_type)[:-1] + ",\"min\":\"" + str(minVal) + "\",\"max\":\"" + str(maxVal) + "\"}"

def generateJSONWithValue(name, parameter_type, value):
    return generateJSON(name, parameter_type)[:-1] + ",\"value\":\"" + str(value) + "\"}"

def generateJSONWithMinMaxValue(name, parameter_type, minVal, maxVal, value):
    return generateJSONWithMinMax(name, parameter_type, minVal, maxVal)[:-1] + ",\"value\":\"" + str(value) + "\"}"

def generateJSONstatus(name, description, status, type):
    return "{\"name\":\"" + str(name) + "\",\"description\":\"" + str(description) + "\",\"status\":\"" + str(status) + "\",\"type\":\"" + type + "\"}"
