"use strict";

module.exports = {
    props: ['title', 'value'],
    template: `
    <div class="switch">
      <label>
        {{title}}
        <input type="checkbox" v-model="value">
        <span class="lever"></span>
      </label>
    </div>
    `,
};
