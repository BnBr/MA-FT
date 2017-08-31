from machine import Pin, Timer

class StepSensor:

    def __init__(self, motor):
        self.motor = motor
        self.lastValue = 0

    def getValue(self):
        return self.motor.getCounter()

    def check(self):
        actualValue = self.taster.value()
        self.blockMotor(actualValue)
        if(self.lastValue != actualValue):
            self.lastValue = actualValue
            return 1
        return 0

    def getLastValue(self):
        return lastValue
