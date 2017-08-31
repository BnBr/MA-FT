class SmartObject:

    def __init__(self, id, name, description, type, mqttClient):
        self.id = id
        self.name = name
        self.description = description
        self.type = type
        self.mqttClient = mqttClient

    def setStatus(self, bool):
        if bool:
            self.mqttClient.pubSMStatus(self.name, self.description, "READY", self.type)
        else:
            self.mqttClient.pubSMStatus(self.name, self.description, "BUSY", self.type)
