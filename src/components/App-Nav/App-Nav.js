export default {
    name: 'app-nav',
    data: function() {
        return {
            activeTab: '_'
        }
    },
        methods: {
            isActive: function(name){
                if(this.activeTab == name) {
                    return true;
                } else {
                    return false;
                }
            },
            
            setActive: function(name) {
                this.activeTab = name;
            }
    }
}
