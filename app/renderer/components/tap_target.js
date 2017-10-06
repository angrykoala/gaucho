"use strict";

module.exports = {
    props: ['title', 'description'],
    template: `
    <div class="tap-target" data-activates="tap-edit">
        <div class="tap-target-content">
            <h5>{{title}}</h5>
            <p style="line-height: 22.5px;">{{description}}</p>
        </div>
    </div>
    `,
};
