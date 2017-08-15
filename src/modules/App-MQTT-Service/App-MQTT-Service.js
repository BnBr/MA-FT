export default class AppMQTTService {
    //*****************************************//
    //  MQTT SERVICE
    //*****************************************//

    init = function () {
        mqtt = require('mqtt');
        client = mqtt.connect('wss://m21.cloudmqtt.com:37630', options);

        client.on('connect', function () {
            client.subscribe('presence')
            client.publish('presence', 'Hello mqtt')
        })

        client.on('message', function (topic, message) {
            // message is Buffer
            console.log(message.toString())
            //client.end()
        })
    }
};

let mqtt = null;
let client = null;

let options = {
    username: 'twfhdfut',
    password: '2Ve4KGL67h1q',
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8)
};

