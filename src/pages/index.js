import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button primary-button button--lg"
            to="/download">
            Download
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
      <div className={clsx("container", styles.description)}>
        <p>
          Gaucho is an open-source, customizable task launcher to run your apps, commands or scripts.
        </p><p>
          Do you run the same commands every time?<br/>
          Gaucho allows you to configure your commands once and run them in a non-intrusive interface.<br/>
          Say goodbye to dozens of terminals.
          </p>
          <p>Check our <a href="docs/intro">documentation</a> to get started.</p>
        <hr/>
      </div>
        <HomepageFeatures />
        <div className={clsx("container")}>
        <hr/>
        <h2 style={{textAlign:"center"}}>Features</h2>
        <ul className={clsx(styles.featureList)}>
          <li><a href="docs/getting-started/creating-tasks">Configure and run your tasks</a></li>
          <li><a href="docs/features/suites">Organize your scripts</a></li>
          <li><a href="docs/features/export-tasks">Export and import tasks</a></li>
          <li><a href="docs/features/schedule-tasks">Schedule tasks</a></li>
          <li><a href="docs/features/env-variables">Manage env variables</a></li>
          <li><a href="docs/features/settings#themes">Themes</a></li>
          <li><a href="download">Available for Linux, Windows and Mac</a></li>
          <li><a href="docs/license">Open Source</a></li>
        </ul>
        </div>
      </main>
    </Layout>
  );
}
