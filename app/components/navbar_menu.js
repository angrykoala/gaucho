"use strict";


module.exports = {
    template: `
    <ul id='navbar-menu' class='dropdown-content'>
      <li><a v-on:click="runAll">Run All</a></li>
      <li><a v-on:click="stopAll">Stop All</a></li>
      <li class="divider"></li>
      <li><a>three</a></li>
    </ul>
    `,
    methods:{
        runAll(){
            
        },
        stopAll(){
            
        }
        
    }
  
};
