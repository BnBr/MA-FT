import AppLanguageService from '../../modules/App-LanguageService/App-LanguageService.js'

export default {
    name: 'app-nav',
    data: function() {
        return {
            activeTab: 'tab1',
            names: null
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
    },
    created: function() {
        const languageService = new AppLanguageService();
        languageService.init('de');
        this.names = languageService.load();
    }
}
