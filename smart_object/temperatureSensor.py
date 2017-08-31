import  uos
from machine import Timer


class TemperatureSensor:

    def __init__(self, rangeFrom, rangeTo):
        self.temperature = 13
        self.isNew = False
        self.rangeFrom = rangeFrom
        self.rangeTo = rangeTo
        self.timer = Timer.Alarm(self.setNew, 5, periodic=True)

    def check(self):
        if self.isNew:
            self.isNew = False
            return True

    def setNew(self, alarm):
        self.isNew = True

    def setIsNew(self, isNew):
        self.isNew = isNew

    def getValue(self):
        self.temperature = (uos.urandom(1)[0] / 256) * (self.rangeTo - self.rangeFrom) + self.rangeFrom
        return self.temperature
