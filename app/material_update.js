"use strict";

//Methods interface with jQuery

module.exports = {
    init(){
        this.updateCollapsible();
        this.updateTabs();
    },
    updateCollapsible() {
        $(".collapsible").collapsible();
    },
    updateTabs() {
        $('ul.tabs').tabs();
    },
    updateInput(){
        Materialize.updateTextFields();
    }
};
