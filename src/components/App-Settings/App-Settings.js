import AppLanguageService from '../../modules/App-LanguageService/App-LanguageService.js'

export default {
    name: 'app-settings',
    data: function() {
        return {
            languageService: null,   
            selectedLanguage: null
        }
    },
        methods: {
            selectLanguage: function(lang){
               this.selectedLanguage = lang;
                this.languageService.init(lang);
            }
    },
    created: function() {
        this.languageService = new AppLanguageService();
        this.selectedLanguage = this.languageService.getSelectedLanguage();
    }
}
