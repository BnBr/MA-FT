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
            assObj['control'] = 'Fernsteuern';
            assObj['multiview'] = 'Mehrfachansicht';
            break;
        case 'en':
            assObj['programs'] = 'Programs';
            assObj['smartObjects'] = 'Smart Objects';
            assObj['settings'] = 'Settings';
            assObj['control'] = 'Control';
            assObj['multiview'] = 'Multiview';
            break;
    }
    return assObj;
};
