import AppLanguageService from '../../modules/App-LanguageService/App-LanguageService.js'

export default {
    name: 'app-nav',
    data: function() {
        return {
            languageService: null,
            activeTab: 'tab1',
            
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
        this.languageService = new AppLanguageService();
    }
}
