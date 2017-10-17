"use strict";

module.exports = {
    replace: false,
    props: ['menuItems'],
    template: `
        <ul class="context-menu dropdown-content active" ref="menu">
            <li v-for="(menuItem, i) in menuItems" class="menu-item unselectable-text">
                <a v-on:click="menuItem.click">{{menuItem.name}}</a>
            </li>
        </ul>
  `
};
