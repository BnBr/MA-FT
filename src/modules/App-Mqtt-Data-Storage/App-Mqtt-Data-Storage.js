export default class AppDataStorage {
    //*****************************************//
    //  MQTT DATA STORAGE
    //*****************************************//

    //*****************************************//
    //  GATEWAY LAYER
    //*****************************************//

    updateGateway = function (topic, messageObj, partsOfStr) {
        if (messageObj == null) return;

        if (storage.server.gateways[partsOfStr[1]] == null) {
            storageLog('NEW GATEWAY REGISTERED');
            storage.server.gateways[partsOfStr[1]] = {
                sms: {}
            };
        } else {
            storageLog('GATEWAY DATA UPDATED');
        }
        this.updateGatewayData(partsOfStr[1], messageObj);
    };

    //*****************************************//
    //  SM LAYER
    //*****************************************//

    updateSM = function (topic, messageObj, partsOfStr) {
        if (messageObj == null) return;
        this.updateGateway(topic, {}, partsOfStr);
        if (storage.server.gateways[partsOfStr[1]].sms[partsOfStr[2]] == null) {
            storageLog('NEW SMART-OBJECT REGISTERED');
            storage.server.gateways[partsOfStr[1]].sms[partsOfStr[2]] = {
                functions: {},
                data: {},
                information: {},
                action: {}
            };
        } else {
            storageLog('SMART-OBJECT DATA UPDATED');
        }
    };

    //*****************************************//
    //  SM-SUBTOPIC LAYER
    //*****************************************//

    updateSMA = function (topic, messageObj, partsOfStr) {
        if (messageObj == null) return;
        this.updateGateway(topic, {}, partsOfStr);
        this.updateSM(topic, {}, partsOfStr);

        if (storage.server.gateways[partsOfStr[1]].sms[partsOfStr[2]].action[partsOfStr[3]] == null) {
            storageLog('NEW SMART-OBJECT-ACTION REGISTERED');
            storage.server.gateways[partsOfStr[1]].sms[partsOfStr[2]].action[partsOfStr[3]] = {};
        } else {
            storageLog('SMART-OBJECT-ACTION DATA UPDATED');
        }
        this.updateSMAData(partsOfStr[1], partsOfStr[2], partsOfStr[3], messageObj);
    };

    updateSMF = function (topic, messageObj, partsOfStr) {
        if (messageObj == null) return;
        this.updateGateway(topic, {}, partsOfStr);
        this.updateSM(topic, {}, partsOfStr);

        if (storage.server.gateways[partsOfStr[1]].sms[partsOfStr[2]].functions[partsOfStr[3]] == null) {
            storageLog('NEW SMART-OBJECT-FUNCTION REGISTERED');
            storage.server.gateways[partsOfStr[1]].sms[partsOfStr[2]].functions[partsOfStr[3]] = {};
        } else {
            storageLog('SMART-OBJECT-FUNCTION DATA UPDATED');
        }
        this.updateSMFData(partsOfStr[1], partsOfStr[2], partsOfStr[3], messageObj);
    };

    updateSMD = function (topic, messageObj, partsOfStr) {
        if (messageObj == null) return;
        this.updateGateway(topic, {}, partsOfStr);
        this.updateSM(topic, {}, partsOfStr);

        if (storage.server.gateways[partsOfStr[1]].sms[partsOfStr[2]].data[partsOfStr[3]] == null) {
            storageLog('NEW SMART-OBJECT-DATA REGISTERED');
            storage.server.gateways[partsOfStr[1]].sms[partsOfStr[2]].data[partsOfStr[3]] = {};
        } else {
            storageLog('SMART-OBJECT-DATA DATA UPDATED');
        }
        this.updateSMDData(partsOfStr[1], partsOfStr[2], partsOfStr[3], messageObj);
    };

    updateSMI = function (topic, messageObj, partsOfStr) {
        if (messageObj == null) return;
        this.updateGateway(topic, {}, partsOfStr);
        this.updateSM(topic, {}, partsOfStr);

        if (storage.server.gateways[partsOfStr[1]].sms[partsOfStr[2]].information[partsOfStr[3]] == null) {
            storageLog('NEW SMART-OBJECT-INFORMATION REGISTERED');
            storage.server.gateways[partsOfStr[1]].sms[partsOfStr[2]].information[partsOfStr[3]] = {};
        } else {
            storageLog('SMART-OBJECT-INFORMATION DATA UPDATED');
        }
        this.updateSMIData(partsOfStr[1], partsOfStr[2], partsOfStr[3], messageObj);
    };

    //*****************************************//
    //  UPDATE DATA FUNCTIONS
    //*****************************************//

    updateGatewayData = function (gatewayName, messageObj) {
        if (messageObj.location) {
            storage.server.gateways[gatewayName].location = messageObj.location;
        }
        if (messageObj.name) {
            storage.server.gateways[gatewayName].name = messageObj.name;
        }
        this.dataWasChanged();
    };

    updateSMAData = function (gatewayName, smName, actionName, messageObj) {
        if (messageObj.functionName) {
            storage.server.gateways[gatewayName].sms[smName].action[actionName].functionName = messageObj.functionName;
        }
        if (messageObj.parameters) {
            storage.server.gateways[gatewayName].sms[smName].action[actionName].parameters = messageObj.parameters;
        }
        this.dataWasChanged();
    };

    updateSMFData = function (gatewayName, smName, functionName, messageObj) {
        if (messageObj.name) {
            storage.server.gateways[gatewayName].sms[smName].functions[functionName].name = messageObj.name;
        }
        if (messageObj.parameter_type) {
            storage.server.gateways[gatewayName].sms[smName].functions[functionName].parameter_type = messageObj.parameter_type;
        }
        if (messageObj.min) {
            storage.server.gateways[gatewayName].sms[smName].functions[functionName].min = messageObj.min;
        }
        if (messageObj.max) {
            storage.server.gateways[gatewayName].sms[smName].functions[functionName].max = messageObj.max;
        }
        this.dataWasChanged();
    };

    updateSMIData = function (gatewayName, smName, informationName, messageObj) {
        if (messageObj.name) {
            storage.server.gateways[gatewayName].sms[smName].information[informationName].name = messageObj.name;
        }
        if (messageObj.description) {
            storage.server.gateways[gatewayName].sms[smName].information[informationName].description = messageObj.description;
        }
        if (messageObj.status) {
            storage.server.gateways[gatewayName].sms[smName].information[informationName].status = messageObj.status
        }
        if (messageObj.type) {
            storage.server.gateways[gatewayName].sms[smName].information[informationName].type = messageObj.type
        }
        this.dataWasChanged();
    };

    updateSMDData = function (gatewayName, smName, dataName, messageObj) {
        if (messageObj.name) {
            storage.server.gateways[gatewayName].sms[smName].data[dataName].name = messageObj.name;
        }
        if (messageObj.parameter_type) {
            storage.server.gateways[gatewayName].sms[smName].data[dataName].parameter_type = messageObj.parameter_type;
        }
        if (messageObj.min) {
            storage.server.gateways[gatewayName].sms[smName].data[dataName].min = messageObj.min;
        }
        if (messageObj.max) {
            storage.server.gateways[gatewayName].sms[smName].data[dataName].max = messageObj.max;
        }
        if (messageObj.value) {
            storage.server.gateways[gatewayName].sms[smName].data[dataName].value = messageObj.value;
        }
        this.dataWasChanged();
    };

    //*****************************************//
    //  RETURN STORAGE DATA
    //*****************************************//

    setChangeEvent = function(callback) {
        onChangeCallback = callback;
        this.dataWasChanged();
    };

    dataWasChanged = function () {
        if (onChangeCallback != null && typeof onChangeCallback === 'function') {
            onChangeCallback(storage);
        }
    };
};

let onChangeCallback = null;

let storage = {
    server: {
        name: 'S1',
        gateways: {},
        mobileDevices: {}
    }
};

var storageLog = function (text) {
    //console.info('STORAGE [' + new Date().toISOString() + '] : ' + text);
}
