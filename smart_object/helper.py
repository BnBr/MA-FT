import time
import pycom

def blink(colorhex):
    pycom.rgbled(colorhex)
    time.sleep(0.2)
    pycom.rgbled(0x000000)

def postingStuff(mqttClient):
    mqttClient.publishRaw("S1" + "/" + "G2", "{\"name\":\"" + "Gateway Two" + "\",\"location\":\"" + "Vancouver" + "\"}")
    mqttClient.publishRaw("S1" + "/" + "G3", "{\"name\":\"" + "Gateway Three" + "\",\"location\":\"" + "Meppen" + "\"}")
    mqttClient.publishRaw("S1" + "/" + "G4", "{\"name\":\"" + "Gateway toHeaven" + "\",\"location\":\"" + "Mensa Westerberg" + "\"}")

    mqttClient.publishRaw("S1" + "/" + "G1" + "/" + "SM2" + "/" + "I0", generateJSONstatus("SM Two", "Yeah, I'm alive!", "READY", "SMARTOBJECT"))
    mqttClient.publishRaw("S1" + "/" + "G1" + "/" + "SM3" + "/" + "I0", generateJSONstatus("SM 3S", "This is the newest creation of Team Westerkamp!", "READY", "SMARTOBJECT"))
    mqttClient.publishRaw("S1" + "/" + "G1" + "/" + "SM4" + "/" + "I0", generateJSONstatus("SM 3000", "Das SmartObject 3000! Es kann alles!", "READY", "SMARTOBJECT"))
    mqttClient.publishRaw("S1" + "/" + "G1" + "/" + "SM5" + "/" + "I0", generateJSONstatus("Die Krosse Krabbe", "Nein, hier ist Patrick!", "READY", "SMARTOBJECT"))
    mqttClient.publishRaw("S1" + "/" + "G1" + "/" + "SM6" + "/" + "I0", generateJSONstatus("SmartCamOS", "I am watching Osnabrueck. :)", "READY", "CAMERA"))


    mqttClient.publishRaw("S1" + "/" + "G2" + "/" + "SM1" + "/" + "I0", generateJSONstatus("SM 36", "This Device is a new invention of Bitnamic Industries.", "READY", "SMARTOBJECT"))
    mqttClient.publishRaw("S1" + "/" + "G2" + "/" + "SM2" + "/" + "I0", generateJSONstatus("SM 256", "They kidnapped me. Please help. I am a SmartPerson.", "READY", "SMARTOBJECT"))
    mqttClient.publishRaw("S1" + "/" + "G2" + "/" + "SM3" + "/" + "I0", generateJSONstatus("SM 40k", "Ich habe 40.000 Sensoren!!", "READY", "SMARTOBJECT"))
    mqttClient.publishRaw("S1" + "/" + "G2" + "/" + "SM4" + "/" + "I0", generateJSONstatus("SmartCam 69", "I am watching you, my dear.", "READY", "CAMERA"))


    mqttClient.publishRaw("S1" + "/" + "G3" + "/" + "SM1" + "/" + "I0", generateJSONstatus("SmartObject Zero", "Hello. I'm new here.", "READY", "SMARTOBJECT"))
    mqttClient.publishRaw("S1" + "/" + "G3" + "/" + "SM2" + "/" + "I0", generateJSONstatus("SmartCam Zero", "Who are you?", "READY", "CAMERA"))

    mqttClient.publishRaw("S1" + "/" + "G4" + "/" + "SM1" + "/" + "I0", generateJSONstatus("SmartObject 6", "Sexy!", "READY", "SMARTOBJECT"))
    mqttClient.publishRaw("S1" + "/" + "G4" + "/" + "SM2" + "/" + "I0", generateJSONstatus("SM 333", "Nur halbsoschlimm wie die Hoelle", "READY", "SMARTOBJECT"))
    mqttClient.publishRaw("S1" + "/" + "G4" + "/" + "SM3" + "/" + "I0", generateJSONstatus("Patrick Star", "Na ein bisschen Roastbeef, n Huenchen, ne Pizza.", "READY", "SMARTOBJECT"))
    mqttClient.publishRaw("S1" + "/" + "G4" + "/" + "SM4" + "/" + "I0", generateJSONstatus("Cam Of God", "WOW! Von hier sieht man ja alles!", "READY", "CAMERA"))

def generateJSON(name, parameter_type):
    return "{\"name\":\"" + str(name) + "\",\"parameter_type\":\"" + str(parameter_type) + "\"}"

def generateJSONstatus(name, description, status, type):
    return "{\"name\":\"" + str(name) + "\",\"description\":\"" + str(description) + "\",\"status\":\"" + str(status) + "\",\"type\":\"" + type + "\"}"

def generateJSONWithMinMax(name, parameter_type, minVal, maxVal):
    return generateJSON(name, parameter_type)[:-1] + ",\"min\":\"" + str(minVal) + "\",\"max\":\"" + str(maxVal) + "\"}"

def generateJSONWithValue(name, parameter_type, value):
    return generateJSON(name, parameter_type)[:-1] + ",\"value\":\"" + str(value) + "\"}"

def generateJSONWithMinMaxValue(name, parameter_type, minVal, maxVal, value):
    return generateJSONWithMinMax(name, parameter_type, minVal, maxVal)[:-1] + ",\"value\":\"" + str(value) + "\"}"
