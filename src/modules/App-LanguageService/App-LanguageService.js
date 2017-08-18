export default class AppLanguageService {
    //*****************************************//
    //  LANGUAGE SERVICE
    //*****************************************//

    init = function (langName) {
        try {
            loadedLanguageData = getLanguageData(langName);
            selectedLanguage = langName;
        } catch (e) {

        }
    };

    getWordFor = function (word) {
        return loadedLanguageData[word];
    };

    getSelectedLanguage = function() {
        return selectedLanguage;
    };

};

let loadedLanguageData = null;

let selectedLanguage = 'en';

function getLanguageData(langName) {
    let assObj = {};
    switch (langName) {
        case 'de':
            assObj['programs'] = 'Programme';
            assObj['smartObjects'] = 'Smart Objects';
            assObj['settings'] = 'Einstellungen';
            assObj['control'] = 'Fernsteuern';
            assObj['multiview'] = 'Mehrfachansicht';
            assObj['name'] = 'Bezeichnung';
            assObj['status'] = 'Status';
            assObj['type'] = 'Typ';
            assObj['camera'] = 'Kamera';
            assObj['smartobject'] = 'Smart Object';
            assObj['busy'] = 'Beschäftigt';
            assObj['offline'] = 'Offline';
            assObj['ready'] = 'Bereit';
            assObj['description'] = 'Beschreibung';
            assObj['sensors'] = 'Sensoren';
            assObj['actuators'] = 'Aktoren';
            assObj['min'] = 'Minimalwert';
            assObj['max'] = 'Maximalwert';
            assObj['value'] = 'Wert';
            assObj['string'] = 'Zeichenkette';
            assObj['integer'] = 'Ganzzahl';
            assObj['boolean'] = 'Boolesche Variable';
            assObj['double'] = 'Gleitkommazahl';
            assObj['trigger'] = 'Ausführen';
            assObj['languageselection'] = 'Sprachauswahl';
            assObj['selection'] = 'Auswahl';
            break;
        case 'en':
            assObj['programs'] = 'Programs';
            assObj['smartObjects'] = 'Smart Objects';
            assObj['settings'] = 'Settings';
            assObj['control'] = 'Control';
            assObj['multiview'] = 'Multiview';
            assObj['name'] = 'Name';
            assObj['status'] = 'Status';
            assObj['type'] = 'Type';
            assObj['camera'] = 'Camera';
            assObj['smartobject'] = 'Smart Object';
            assObj['busy'] = 'Busy';
            assObj['offline'] = 'Offline';
            assObj['ready'] = 'Ready';
            assObj['description'] = 'Description';
            assObj['sensors'] = 'Sensors';
            assObj['actuators'] = 'Actuators';
            assObj['min'] = 'Min';
            assObj['max'] = 'Max';
            assObj['value'] = 'Value';
            assObj['string'] = 'String';
            assObj['integer'] = 'Integer';
            assObj['boolean'] = 'Boolean';
            assObj['double'] = 'Double/Float';
            assObj['trigger'] = 'Trigger';
            assObj['languageselection'] = 'Select language';
            assObj['selection'] = 'Selection';
            break;
    }
    return assObj;
};
