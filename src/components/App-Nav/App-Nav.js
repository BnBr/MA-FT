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
                switch(name) {
                    case 'tab0':
                        this.$router.push('/programs');
                        break;
                    case 'tab1':
                        this.$router.push('/');
                        break;
                    case 'tab2':
                        this.$router.push('/settings');
                        break;
                }
            }
    },
    created: function() {
        this.languageService = new AppLanguageService();
    }
}
