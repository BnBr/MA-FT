from mqttConnector import MQTTConnector

class Periphals:

    def __init__(self, id, name, parameter_type, minVal, maxVal, mqttObject, thingObject=None):
        self.id = id
        self.name = name
        self.parameter_type = parameter_type
        self.minVal = minVal
        self.maxVal = maxVal
        self.mqttObject = mqttObject
        self.thingObject = thingObject

    def getId(self):
        return self.id

    def getName(self):
        return self.name

    def getParameterType(self):
        return self.parameter_type

    def getMinVal(self):
        return self.minVal

    def getMaxVal(self):
        return self.maxVal

    def checkSensor(self):
        return self.thingObject.check()

    def getValue(self):
        return self.thingObject.getValue()

    def checkAndGetValue(self):
        if thingObject==None:
            return -1
        return self.thingObject.checkAndGetValue()

    def getObject(self):
        return self.thingObject

    def changeValue(self, value):
        if thingObject==None:
            return -1
        self.thingObject.changeValue(value)
