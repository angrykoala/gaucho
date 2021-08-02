import React,{ useState,useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '../components/HomepageFeatures';
import GithubMiniApi from '../components/GithubMiniApi'
import styles from './download.module.css';

function AssetLink({name,browser_download_url}) {
  return (
    <li>
    <a href={browser_download_url}>{name}</a>
  </li>
)
}


export default function Download() {
  const [releaseData, setReleaseData] = useState({});
  useEffect(async () => {
    const res=await GithubMiniApi.getLastRelease()
    const data=await res.json()
    console.log(data[0])
    setReleaseData(data[0])
  }, [])
  const assets=releaseData.assets || []
  const version=releaseData.tag_name

  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Download`}
      description={siteConfig.tagline}>
      <main className={clsx(styles.downloadPage)}>
        <div>
          <h1>Download Gaucho {version}</h1>

          <ul>
            {assets.map((asset, idx) => (
              <AssetLink key={idx} {...asset} />
            ))}
          </ul>

          <a href="https://github.com/angrykoala/gaucho/releases">Check all releases</a>
        </div>
      </main>
    </Layout>
  );
}

// You can download Gaucho for Linux, Windows, and Mac at https://github.com/angrykoala/gaucho/releases
