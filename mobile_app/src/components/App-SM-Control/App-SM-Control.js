import AppMQTTDataStorage from '../../modules/App-MQTT-Data-Storage/App-MQTT-Data-Storage.js'
import AppLanguageService from '../../modules/App-LanguageService/App-LanguageService.js'
import AppMQTTService from '../../modules/App-MQTT-Service/App-MQTT-Service.js'

export default {
    name: 'app-sm-control',
    props: ['SMTopic'],
    data: function () {
        return {
            storageData: null,
            languageService: null,
            mqttService: null,
            isSMTopicReadable: false,
            SMData: null,
            clickId: '',
            lastInput: ''
        }
    },
    methods: {
        setListeners: function () {
            window.addEventListener("resize", this.resizeEvent);
            window.addEventListener("orientationchange", this.orientationchangeEvent);
        },

        resizeEvent: function () {

        },

        orientationchangeEvent: function () {

        },

        checkForSMUpdate: function () {
            try {
                let partsOfTopic = this.convertSMTopicIntoArray();
                if (partsOfTopic.length > 0) {
                    if (this.storageData && this.storageData.server && this.storageData.server.gateways) {
                        if (this.storageData.server.gateways[partsOfTopic[1]] != null) {
                            if (this.storageData.server.gateways[partsOfTopic[1]].sms[partsOfTopic[2]] != null) {
                                this.updateSM(this.storageData.server.gateways[partsOfTopic[1]].sms[partsOfTopic[2]]);
                            }
                        }
                    }
                }
            } catch (e) {

            }
        },

        clickAction: function (uniqueId, input, type) {
            this.clickId = uniqueId;
            var that = this;
            setTimeout(function () {
                if (that.clickId == uniqueId) {
                    that.clickId = '';
                }
            }, 3000);
            switch (type) {
                case 'INTEGER':
                    this.handleIntegerInput(uniqueId, input);
                    break;
                case 'DOUBLE':
                    this.handleDoubleInput(uniqueId, input);
                    break;
                case 'STRING':
                    this.handleStringInput(uniqueId, input);
                    break;
                case 'BOOLEAN':
                    this.handleBooleanInput(uniqueId, input);
                    break;
                case 'NONE':
                    this.handleNoneInput(uniqueId);
                    break;
                default:
                    break;
            }
        },

        isClickId: function (uniqueId) {
            if (this.clickId == uniqueId) {
                return true;
            } else {
                return false;
            }
        },
        
        isSMBusy: function() {
            if(this.SMData.information['I0'].status == 'BUSY') {
                return true;
            } else {
                return false;
            }
        },

        handleIntegerInput: function (uniqueId, input) {
            try {
                if (typeof Number(input) == 'number') {
                    let convertedInput = Number(input);
                    if (convertedInput >= this.SMData.functions[uniqueId].min && convertedInput <= this.SMData.functions[uniqueId].max) {
                        if(this.isSMBusy() == false) {
                            let convertedSMArray = this.convertSMTopicIntoArray();
                            let SMTopic = convertedSMArray[0] + '/' + convertedSMArray[1] + '/' + convertedSMArray[2];
                            this.mqttService.sendAction(SMTopic, uniqueId, convertedInput);
                        }
                    } else {
                        if(convertedInput < this.SMData.functions[uniqueId].min) {
                            this.notify(this.languageService.getWordFor('inputtoosmall'));
                        } else if(convertedInput > this.SMData.functions[uniqueId].max) {
                            this.notify(this.languageService.getWordFor('inputtoobig'));
                        }
                    }
                }
            } catch (e) {
                throw e;
            }
        },

        handleDoubleInput: function (uniqueId, input) {
            try {
                if (typeof Number(input) == 'number') {
                    let convertedInput = Number(input);
                    if (convertedInput >= this.SMData.functions[uniqueId].min && convertedInput <= this.SMData.functions[uniqueId].max) {
                        if(this.isSMBusy() == false) {
                            let convertedSMArray = this.convertSMTopicIntoArray();
                            let SMTopic = convertedSMArray[0] + '/' + convertedSMArray[1] + '/' + convertedSMArray[2];
                            this.mqttService.sendAction(SMTopic, uniqueId, convertedInput);
                        }
                    } else {
                        if(convertedInput < this.SMData.functions[uniqueId].min) {
                            this.notify(this.languageService.getWordFor('inputtoosmall'));
                        } else if(convertedInput > this.SMData.functions[uniqueId].max) {
                            this.notify(this.languageService.getWordFor('inputtoobig'));
                        }
                    }
                }
            } catch (e) {
                throw e;
            }
        },

        handleStringInput: function (uniqueId, input) {
            try {
                if (input != null && input != undefined) {
                    if (input.length >= this.SMData.functions[uniqueId].min && input.length <= this.SMData.functions[uniqueId].max) {
                        if(this.isSMBusy() == false) {
                            let convertedSMArray = this.convertSMTopicIntoArray();
                            let SMTopic = convertedSMArray[0] + '/' + convertedSMArray[1] + '/' + convertedSMArray[2];
                            this.mqttService.sendAction(SMTopic, uniqueId, input);
                        }
                    } else {
                        if(input.length < this.SMData.functions[uniqueId].min) {
                            this.notify(this.languageService.getWordFor('inputtoosmall'));
                        } else if(input.length > this.SMData.functions[uniqueId].max) {
                            this.notify(this.languageService.getWordFor('inputtoobig'));
                        }
                    }
                }
            } catch (e) {
                throw e;
            }
        },

        handleBooleanInput: function (uniqueId, input) {
            try {
                if (typeof Boolean(input) == 'boolean') {
                    if(this.isSMBusy() == false) {
                        let convertedSMArray = this.convertSMTopicIntoArray();
                        let SMTopic = convertedSMArray[0] + '/' + convertedSMArray[1] + '/' + convertedSMArray[2];
                        if(Boolean(input) == true) {
                            this.mqttService.sendAction(SMTopic, uniqueId, 1);
                        } else {
                            this.mqttService.sendAction(SMTopic, uniqueId, 0);
                        }
                    }
                } else {
                    this.notify('');
                }
            } catch (e) {
                throw e;
            }
        },

        handleNoneInput: function (uniqueId) {
            try {
                if(this.isSMBusy() == false) {
                    let convertedSMArray = this.convertSMTopicIntoArray();
                    let SMTopic = convertedSMArray[0] + '/' + convertedSMArray[1] + '/' + convertedSMArray[2];
                    this.mqttService.sendAction(SMTopic, uniqueId, '');
                }
            } catch (e) {
                throw e;
            }
        },

        updateSM: function (data) {
            this.SMData = Object.assign({}, this.SMData, data);
        },

        convertSMTopicIntoArray: function () {
            if (this.SMTopic == null || this.SMTopic == undefined) {
                return [];
            } else {
                return this.SMTopic.split('-');
            }
        },

        notify: function (text) {
            if (window.webkitNotifications.checkPermission() == 0) {
                let notification = window.webkitNotifications.createNotification(
                    '../../assets/image/icon-iot-notification.png',
                    this.languageService.getWordFor('cantdothis'),
                    text
                );
                notification.show();
            } else {
                window.webkitNotifications.requestPermission();
            }
        },

        removeListeners: function () {
            window.removeEventListener('onresize', this.resizeEvent);
            window.removeEventListener('orientationchange', this.orientationchangeEvent);
        }
    },
    ready: {

    },
    computed: {

    },
    created: function () {
        const that = this;
        const mqttDataStorage = new AppMQTTDataStorage();
        mqttDataStorage.setChangeEvent(function (storage) {
            that.storageData = Object.assign({}, that.storageData, storage);
            that.checkForSMUpdate();
        });
        this.languageService = new AppLanguageService();
        this.mqttService = new AppMQTTService();
    },
    mounted: function () {
        this.setListeners();
    },
    watch: {

    },
    beforeDestroy: function () {
        this.removeListeners();
    }
}
