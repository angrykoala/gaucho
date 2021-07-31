import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [

  {
    title: 'Execute commands with one click',
    img: require('../../static/img/tasks.png').default,
    description: (
      <>
        Run and stop your commands, apps and scripts from Gaucho with a single click.
      </>
    ),
  },
  {
    title: 'Create your tasks',
    img: require('../../static/img/edit_task.png').default,
    description: (
      <>
        Easily create and configure your tasks.
      </>
    ),
  },
];

function Feature({img, title, description}) {
  return (
    <div className={clsx('col col--6')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="text--center">
      <img className={styles.featureImage} alt={title} src={img}/>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
