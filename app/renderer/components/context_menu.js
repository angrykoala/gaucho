"use strict";
const AppStatus = require('../app_status');
const GauchoActions = require('../api/gaucho_actions');

module.exports = {
    replace: false,
    props: ['menuItems'],
    template: `
        <ul class="context-menu dropdown-content active" ref="menu">
            <li v-for="(menuItem, i) in _menuItems" class="menu-item unselectable-text">
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
            menuElement.style.display = "block";
            let bounds = menuElement.getBoundingClientRect();
            // Math.min here to avoid the menu going off the side of the screen
            menuElement.style.left = `${Math.min(window.innerWidth - bounds.width - 3, event.clientX)}px`;
            menuElement.style.top = `${Math.min(window.innerHeight - bounds.height - 5, event.clientY)}px`;
            event.preventDefault();
        }
    },
    computed: {
        _menuItems() {
            if (this.menuItems) {   // if menu items are set use them
                return this.menuItems;
            }
            // otherwise use default
            return [
                {name: 'About', click: GauchoActions.toggleAbout },
                {name: 'Configuration', click: GauchoActions.toggleConfig },
                {name: AppStatus.editMode ? "Cancel Edit" : "Edit", click: GauchoActions.toggleEdit }
            ];
        }
    }
};
