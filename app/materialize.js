"use strict";

//Methods interface with jQuery

module.exports = {
    init(){
        this.updateCollapsible();
        this.updateTabs();
    },
    updateCollapsible() {
        $(".collapsible").collapsible(); // jshint ignore:line
    },
    updateTabs() {
        $('ul.tabs').tabs(); // jshint ignore:line
    },
    updateInput(){
        Materialize.updateTextFields(); // jshint ignore:line
    },
    selectTab(selector,tabId){
         $(selector).tabs('select_tab', tabId); // jshint ignore:line
    }
};
