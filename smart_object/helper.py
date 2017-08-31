import time
import pycom

def blink(colorhex):
    pycom.rgbled(colorhex)
    time.sleep(0.2)
    pycom.rgbled(0x000000)
