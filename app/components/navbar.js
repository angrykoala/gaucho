"use strict";

module.exports={
    props:['suites'],
    
    template:`
    <div class="navbar-fixed">
        <nav class="nav-extended">
            <div class="nav-wrapper">
                <a href="#" class="brand-logo left">Gaucho</a>
                <ul class="right">
                    <li><a href="#sass.html">Sass</a></li>
                    <li><a href="#badges.html">Components</a></li>
                    <li><a href="#collapsible.html">JavaScript</a></li>
                </ul>

                <ul class="tabs tabs-transparent">
                    <template v-for="(suite,index) in suites">
                        <li class="tab"><a v-bind:href="'#tab'+index" v-bind:class="{ active: index===0 }"><strong>{{suite.title}}</strong></a></li>
                    </template>
                    <li class="tab"><a href="#newtab"><span class="material-icons">add</span></a></li>
                </ul>
            </div>
        </nav>
    </div>
    `
    
    
    

};
