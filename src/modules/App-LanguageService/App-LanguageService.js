
export default class AppLanguageService {
    //*****************************************//
    //  LANGUAGE SERVICE
    //*****************************************//
    
    init = function(langName) {
        try {
            var imported = document.createElement('script');
            imported.src = './languagesData/' + langName + '.js';
            document.head.appendChild(imported);
            loadedData = getLanguageData();
        } catch(e) {
            
        }
    };

    load = function(){
        //hier würde die aktuelle geladene Sprache zurückgegeben werden
        return this.loadedData;
    };
    
    loadedData = null;


}
   