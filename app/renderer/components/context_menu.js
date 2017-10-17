"use strict";
const AppStatus = require('../app_status');

module.exports = {
    replace: false,
    props: ['menuItems'],
    template: `
        <ul class="context-menu dropdown-content active" ref="menu">
            <li v-for="(menuItem, i) in menuItems" class="menu-item unselectable-text">
                <a v-on:click="menuItem.click">{{menuItem.name}}</a>
            </li>
        </ul>
  `,
    methods: {
        openContextMenu(event) {
            if (AppStatus.currentContextMenu !== null) {
                AppStatus.currentContextMenu.$el.style.display = 'none';
            }
            AppStatus.currentContextMenu = this;
            let menuElement = this.$el;
            menuElement.style.left = `${event.clientX}px`;
            menuElement.style.top = `${event.clientY}px`;
            menuElement.style.display = "block";
            event.preventDefault();
        }
    }
};
