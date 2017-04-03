"use strict";



module.exports = {

    template: `
    <div class="window-frame-top">
        <div class="close-button">
            <i class="tiny material-icons unselectable window-frame-button" v-on:click="onClose">close</i>
            <i class="tiny material-icons unselectable window-frame-button" v-on:click="onMaximize">crop_square</i>
            <i class="tiny material-icons unselectable window-frame-button" v-on:click="onMinimize">remove</i>
        </div>
    </div>
    `,
    methods:{
        onClose(){
            console.log("Close");
        },
        onMaximize(){
            console.log("Max");
        },
        onMinimize(){
            console.log("Mini");
        }
        
        
        
    }
};
