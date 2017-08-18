import AppMQTTDataStorage from '../../modules/App-MQTT-Data-Storage/App-MQTT-Data-Storage.js'
import AppLanguageService from '../../modules/App-LanguageService/App-LanguageService.js'

export default {
    name: 'app-sm-control',
    props: ['SMTopic'],
    data: function () {
        return {
            storageData: null,
            languageService: null,
            isSMTopicReadable: false,
            SMData: null
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
        
        checkForSMUpdate: function() {
            try {
                let partsOfTopic = this.convertSMTopicIntoArray();
                if(partsOfTopic.length > 0) {
                    if(this.storageData && this.storageData.server && this.storageData.server.gateways) {
                        if(this.storageData.server.gateways[partsOfTopic[1]] != null) {
                            if(this.storageData.server.gateways[partsOfTopic[1]].sms[partsOfTopic[2]] != null) {
                                this.updateSM(this.storageData.server.gateways[partsOfTopic[1]].sms[partsOfTopic[2]]);
                            }
                        }
                    }
                }
            } catch(e) {
                
            }
        },
            
        updateSM: function(data) {
            this.SMData = Object.assign({}, this.SMData, data);
        },
        
        convertSMTopicIntoArray: function() {
            if(this.SMTopic == null || this.SMTopic == undefined) {
                return [];
            } else {
                return this.SMTopic.split('-');
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
