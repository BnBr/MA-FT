
export default {
    name: 'app-wheel',
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