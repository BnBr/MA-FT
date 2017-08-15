import AppMQTTService from '../../modules/App-MQTT-Service/App-MQTT-Service.js'


export default {
    name: 'app--sm-list',
    data: function() {
        return {
            
        }
    },
    methods: {
        setListeners: function() {
            window.addEventListener("resize", this.resizeEvent);
            window.addEventListener("orientationchange", this.orientationchangeEvent);
        },
        
        resizeEvent: function() {

        },
        
        orientationchangeEvent: function() {
          
        },
        
        removeListeners: function() {
            window.removeEventListener('onresize', this.resizeEvent);
            window.removeEventListener('orientationchange', this.orientationchangeEvent);
        }
    },
    ready: {
        
    },
    computed: {

    },
    created: function() {
        const mqttService  = new AppMQTTService();
        mqttService.init();
    },
    mounted: function() {
        this.setListeners();
    },
    watch: {
       
    }, 
    beforeDestroy: function() {
        this.removeListeners();
    }
}