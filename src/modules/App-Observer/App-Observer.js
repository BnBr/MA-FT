
export default class AppObserver {
    //*****************************************//
    //  OBSERVE AND REACT TO EVENTS
    //*****************************************//
    
    observe = function() {
        this.setListeners();
    };

    stopObserving = function() {
        this.removeListeners();
    };
    
    setListeners = function() {
        window.addEventListener('unload', this.leavingEvent);
        window.addEventListener('beforeunload', this.leavingEvent);
    };

    leavingEvent = function() {

    };
    
    removeListeners = function() {
        window.removeEventListener('unload', this.leavingEvent);
        window.removeEventListener('beforeunload', this.leavingEvent);
    };
}
   