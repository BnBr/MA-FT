from machine import Pin, Timer

class LimitSwitch:

    def __init__(self, PIN, motor, atMotorSite=True):
        self.taster = Pin(PIN, Pin.IN, Pin.PULL_DOWN)
        self.taster.callback(trigger=Pin.IRQ_RISING, handler=self.theUltimatePinHandler) # Motor blockieren
        self.motor = motor
        self.atMotorSite = atMotorSite
        self.lastValue = 0


    def theUltimatePinHandler(self, pin):
        if self.taster.value():
            self.unblockMotor(False)
            #print("I blocked " + self.motor.getName() + " - I am at Motorsite: " + str(self.atMotorSite))
        else:
            self.unblockMotor(True)
            #print("I released " + self.motor.getName() + " - I am at Motorsite: " + str(self.atMotorSite))

    def unblockMotor(self, unblockBool):
        self.motor.setCanDriveToWhatSiteLimitSwitch(unblockBool, drivingTowardsMotorSite=self.atMotorSite)

    def blockMotor(self, blockBool):
        if blockBool:
            self.unblockMotor(False)
        else:
            self.unblockMotor(True)

    def getActualValue(self):
        self.blockMotor(self.taster.value())
        return self.taster.value()

    def getValue(self):
        return self.getActualValue()

    def check(self):
        actualValue = self.taster.value()

        if(self.lastValue != actualValue):
            self.blockMotor(actualValue)
            self.lastValue = actualValue
            return 1
        return 0

    def getLastValue(self):
        return lastValue
