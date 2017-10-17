"use strict";

module.exports = {
    replace: false,
    props: ['menuItems'],
    template: `
        <div class="menu" ref="menu">
            <div v-for="(menuItem, i) in menuItems" class="menu-item" v-on:click="menuItem.click">{{menuItem.name}}</div>
        </div>
  `
};
