const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Gaucho',
  tagline: 'Minimalist Task Launcher',
  url: 'https://angrykoala.github.io',
  baseUrl: '/gaucho/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'angrykoala', // Usually your GitHub org/user name.
  projectName: 'gaucho', // Usually your repo name.
  themeConfig: {
    colorMode: {
      disableSwitch:true
    },
    navbar: {
      title: 'Gaucho',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [{
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Docs',
        },
        // {
        //   to: '/blog',
        //   label: 'Blog',
        //   position: 'left'
        // },
        {
          to: '/download',
          label: 'Download',
          position: 'left'
        },
        {
          href: 'https://github.com/angrykoala/gaucho',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `${new Date().getFullYear()} Gaucho. Made with ❤️ by <a href="https://github.com/angrykoala">@angrykoala</a>.<br/>
      This page content is <a href="https://creativecommons.org/licenses/by-sa/4.0/">Creative Commons BY-SA</a>`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    announcementBar: {
      id: 'gaucho_1_0',
      content: 'Gaucho 1.0 is here! <a href="/download">Download</a>',
      backgroundColor: '#2bbbad',
      textColor: '#091E42',
      isCloseable: true,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // editUrl: 'https://github.com/angrykoala/gaucho/tree/gh-pages',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // editUrl: 'https://github.com/angrykoala/gaucho/tree/gh-pages/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
