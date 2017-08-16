import AppMQTTDataStorage from '../../modules/App-MQTT-Data-Storage/App-MQTT-Data-Storage.js'
import AppLanguageService from '../../modules/App-LanguageService/App-LanguageService.js'

export default {
    name: 'app-sm-control',
    props: ['SMTopic'],
    data: function () {
        return {
            storageData: null,
            languageService: null
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
        console.log(this.SMTopic);
        const that = this;
        const mqttDataStorage = new AppMQTTDataStorage();
        mqttDataStorage.setChangeEvent(function (storage) {
            that.storageData = Object.assign({}, that.storageData, storage);
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
