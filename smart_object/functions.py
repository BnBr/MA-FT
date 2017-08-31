class Function:

    def __init__(self, id, name, parameter_type, minVal=0, maxVal=1):
        self.id = id
        self.name = name
        self.parameter_type = parameter_type
        self.minVal = minVal
        self.maxVal = maxVal

    def getName(self):
        return self.name

    def getParameterType(self):
        return self.parameter_type

    def getMinVal(self):
        return self.minVal

    def getMaxVal(self):
        return self.maxVal

    def getId(self):
        return self.id
