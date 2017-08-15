export default class AppLanguageService {
    //*****************************************//
    //  LANGUAGE SERVICE
    //*****************************************//

    init = function (langName) {
        try {
            loadedLanguageData = getLanguageData(langName);
        } catch (e) {

        }
    };

    getWordFor = function (word) {
        return loadedLanguageData[word];
    };

};

let loadedLanguageData = null;

function getLanguageData(langName) {
    let assObj = {};
    switch (langName) {
        case 'de':
            assObj['programs'] = 'Programme';
            assObj['smartObjects'] = 'Smart Objects';
            assObj['settings'] = 'Einstellungen';
            break;
        case 'en':
            assObj['programs'] = 'Programs';
            assObj['smartObjects'] = 'Smart Objects';
            assObj['settings'] = 'Settings';
            break;
    }
    return assObj;
};
