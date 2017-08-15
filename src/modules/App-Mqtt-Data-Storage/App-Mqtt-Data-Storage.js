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
        console.log(storage);
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
                action: {},
            };
        } else {
            storageLog('SMART-OBJECT DATA UPDATED');
        }
        console.log(storage);
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
        console.log(storage);
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
        console.log(storage);
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
        console.log(storage);
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
        console.log(storage);
    };

    //*****************************************//
    //  UPDATE DATA FUNCTIONS
    //*****************************************//

    updateGatewayData = function (gatewayName, messageObj) {
        if (messageObj.destination) {
            storage.server.gateways[gatewayName].destination = messageObj.destination;
        }
    };

    updateSMAData = function (gatewayName, smName, actionName, messageObj) {
        if (messageObj.functionName) {
            storage.server.gateways[gatewayName].sms[smName].action[actionName].functionName = messageObj.functionName;
        }
        if (messageObj.parameters) {
            storage.server.gateways[gatewayName].sms[smName].action[actionName].parameters = messageObj.parameters;
        }
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
    };

    updateSMIData = function (gatewayName, smName, informationName, messageObj) {
        if (messageObj.name) {
            storage.server.gateways[gatewayName].sms[smName].information[informationName].name = messageObj.name;
        }
        if (messageObj.status) {
            storage.server.gateways[gatewayName].sms[smName].information[informationName].status = messageObj.status
        }
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
    };
};

let storage = {
    server: {
        name: 'S1',
        gateways: {},
        mobileDevices: {}
    }
};

var storageLog = function (text) {
    console.info('STORAGE [' + new Date().toISOString() + '] : ' + text);
}
