from machine import Pin, Timer
import time

class ServoMotor:

    def __init__(self, name, forwardPIN, reversePIN, maxVal, counterPIN=None):
        self.name = name
        self.forwardPIN = Pin(forwardPIN, Pin.OUT)
        self.reversePIN = Pin(reversePIN, Pin.OUT)
        self.maxVal = maxVal
        self.canDrive = True
        self.canDriveAwayFromMotor = True
        self.canDriveTowardsMotor = True
        self.stepcounter = 0
        self.stepcounterChanged = False
        self.endCount = 50000
        self.drivingDirection = False # False = towards motor; True = away from motor
        self.abort = False
        if counterPIN==None:
            self.counterPIN = None
        else:
            self.counterPIN = Pin(counterPIN, Pin.IN, Pin.PULL_UP)
            self.counterPIN.callback(trigger=Pin.IRQ_FALLING, handler=self.pinHandler) # Motor freigeben


    def getName(self):
        return self.name

    def getCounter(self):
        return self.stepcounter

    def pinHandler(self, pin):
        if self.drivingDirection:
            self.addToCounter()
        else:
            self.substractFromCounter()

    def substractFromCounter(self, count=1):
        self.stepcounter = self.stepcounter - count
        self.stepcounterChanged = True

    def addToCounter(self, count=1):
        self.stepcounter = self.stepcounter + count
        self.stepcounterChanged = True

    def resetCounterToMin(self):
        self.stepcounter = 0
        self.stepcounterChanged = True

    def resetCounterToMax(self):
        self.stepcounter = self.maxVal
        self.stepcounterChanged = True

    def defineEndCount(self, count):
        self.endCount = count

    def setCanDrive(self, bool):
        self.canDrive = bool

    def getValue(self):
        return self.getCounter()

    def check(self):
        if self.stepcounterChanged:
            self.stepcounterChanged = False
            return 1
        else:
            return 0

    def setCanDriveToWhatSiteLimitSwitch(self, releaseBool, drivingTowardsMotorSite=True):
        if drivingTowardsMotorSite:
            self.setCanDriveTowardsMotor(releaseBool)
            if(releaseBool is False):
                self.resetCounterToMin()
        else:
            self.setCanDriveAwayFromMotor(releaseBool)
            if(releaseBool is False):
                self.resetCounterToMax()

    def setCanDriveAwayFromMotor(self, bool):
        self.canDriveAwayFromMotor = bool

    def setCanDriveTowardsMotor(self, bool):
        self.canDriveTowardsMotor = bool

    def startToPosition(self, position):
        if (self.stepcounter < position):
            while(self.canDriveAwayFromMotor and self.canDrive and self.stepcounter < position):
                self.drivingDirection = True
                time.sleep(0.1)
                self.forwardPIN.value(1)
            self.forwardPIN.value(0)
        elif (self.stepcounter > position):
            while(self.canDriveAwayFromMotor and self.canDrive and self.stepcounter > position):
                self.drivingDirection = False
                time.sleep(0.1)
                self.reversePIN.value(1)
            self.reversePIN.value(0)
        else:
            self.stop()
        self.stop()

    def start(self, drivingDirectionAwayFromMotor=True): # False = towards motor; True = away from motor
        self.drivingDirection = drivingDirectionAwayFromMotor
        if self.drivingDirection:
            while(self.canDriveAwayFromMotor and self.canDrive):
                self.forwardPIN.value(1)
            self.forwardPIN.value(0)
        else:
            while(self.canDriveTowardsMotor and self.canDrive):
                self.reversePIN.value(1)
            self.reversePIN.value(0)

    def stop(self):
        #self.canDrive(False)
        self.forwardPIN.value(0)
        self.reversePIN.value(0)

    def getCanDriveAwayFromMotor(self):
        return self.canDriveAwayFromMotor

    def getCanDriveTowardsMotor(self):
        return self.canDriveTowardsMotor
