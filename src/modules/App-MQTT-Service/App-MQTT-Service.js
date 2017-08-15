import AppMQTTDataStorage from '../App-MQTT-Data-Storage/App-MQTT-Data-Storage.js'
const mqttDataStorage = new AppMQTTDataStorage();

export default class AppMQTTService {
    //*****************************************//
    //  MQTT SERVICE
    //*****************************************//

    init = function () {
        var that = this;
        mqtt = require('mqtt');
        client = mqtt.connect(url, options);

        client.on('connect', function () {
            that.subscribeToInformationTopic(client);
            that.subscribeToServer(client);
        })

        client.on('message', function (topic, message) {
            switch (topic) {
                case mobileDeviceTopic:
                    mqttLog('MQTT SELF TOPIC INFORMATION INCOMING');
                    break;
                default:
                    that.handleMqttMessage(topic, message);
                    break;
            }
        })
    };

    subscribeToInformationTopic = function (client) {
        client.subscribe(mobileDeviceTopic);
        client.publish(mobileDeviceTopic, 'GET_ALL_DEVICES');
    };

    subscribeToServer = function (client) {
        client.subscribe(serverTopic);
    };

    handleMqttMessage = function (topic, message) {
        try {
            this.handleMessage(topic, message);
        } catch (e) {
            throw e;
        }
    };

    handleMessage = function (topic, message) {
        if (this.isTopicInCorrectFormat(topic) == false) {
            mqttLog('FALSE FORMAT MESSAGE');
            return;
        };
        let partsOfStr = topic.split('/');
        let lastString;
        switch (partsOfStr.length) {
            case 2:
                mqttLog('GATEWAY LAYER MESSAGE');
                this.handleGatewayLayerMessage(topic, message, partsOfStr);
                break;
            case 3:
                mqttLog('SM-LAYER MESSAGE');
                this.handleSMLayerMessage(topic, message, partsOfStr);
                break;
            case 4:
                mqttLog('SM-SUBTOPIC LAYER MESSAGE');
                this.handleSMSubtopicLayerMessage(topic, message, partsOfStr);
                break;
            default:
                mqttLog('FALSE FORMAT MESSAGE');
                break;
        }
    };

    handleGatewayLayerMessage = function (topic, message, partsOfStr) {
        let layerType = this.divideInLettersAndNumbers(partsOfStr[1]).letters;
        switch (layerType) {
            case 'G':
                mqttDataStorage.updateGateway(topic, this.parseMessage(message), partsOfStr);
                break;
            default:
                break;
        }
    };

    handleSMLayerMessage = function (topic, message, partsOfStr) {
        let layerType = this.divideInLettersAndNumbers(partsOfStr[2]).letters;
        switch (layerType) {
            case 'SM':
                mqttDataStorage.updateSM(topic, this.parseMessage(message), partsOfStr);
                break;
            default:
                break;
        }
    };

    handleSMSubtopicLayerMessage = function (topic, message, partsOfStr) {
        let layerType = this.divideInLettersAndNumbers(partsOfStr[3]).letters;
        switch (layerType) {
            case 'F':
                mqttDataStorage.updateSMF(topic, this.parseMessage(message), partsOfStr);
                break;
            case 'A':
                mqttDataStorage.updateSMA(topic, this.parseMessage(message), partsOfStr);
                break;
            case 'D':
                mqttDataStorage.updateSMD(topic, this.parseMessage(message), partsOfStr);
                break;
            case 'I':
                mqttDataStorage.updateSMI(topic, this.parseMessage(message), partsOfStr);
                break;
            default:
                break;
        }
    };

    isTopicInCorrectFormat = function (topic) {
        let partsOfStr = topic.split('/');
        let isCorrect = true;
        partsOfStr.forEach(function (part) {
            if (/^\b[A-Z]{1,}[0-9]{1,}?$/.test(part) == false) {
                isCorrect = false;
            }
        });
        return isCorrect;
    };

    divideInLettersAndNumbers = function (lastString) {
        let firstDigit = lastString.match(/\d/)
        let positionOfFirstNumber = lastString.indexOf(firstDigit)
        let letters = lastString.substring(0, positionOfFirstNumber);
        let numbers = lastString.substring(positionOfFirstNumber);
        return {
            letters: letters,
            numbers: numbers
        };
    };

    parseMessage = function(message) {
        try {
            let stringifiedObj = message.toString();
            let obj = JSON.parse(stringifiedObj);
            return obj;
        } catch(e) {
            return null;
            throw e;
        }    
    };

};

let mqtt = null;
let client = null;
let url = 'wss://m21.cloudmqtt.com:37630';
let options = {
    username: 'twfhdfut',
    password: '2Ve4KGL67h1q',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8)
};

let serverTopic = 'S1/#';
let mobileDeviceTopic = 'S1/MD/' + options.clientId;

let mqttLog = function (text) {
    console.info('MQTT [' + new Date().toISOString() +'] : ' + text);
};
