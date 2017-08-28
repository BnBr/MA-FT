import AppMQTTDataStorage from '../../modules/App-MQTT-Data-Storage/App-MQTT-Data-Storage.js'
import AppLanguageService from '../../modules/App-LanguageService/App-LanguageService.js'

export default {
    name: 'app-sm-list',
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
        const that = this;
        const mqttDataStorage = new AppMQTTDataStorage();
        mqttDataStorage.setChangeEvent(function (storage) {
            //that.storageData = storage;
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
