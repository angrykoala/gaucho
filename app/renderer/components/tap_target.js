"use strict";

module.exports = {
    props: ['title', 'description', 'activates'],
    template: `
    <div class="tap-target" v-bind:data-activates="activates">
        <div class="tap-target-content">
            <h5>{{title}}</h5>
            <p style="line-height: 22.5px;">{{description}}</p>
        </div>
    </div>
    `
};
