import React,{ useState,useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '../components/HomepageFeatures';
import Loader from '../components/Loader';
import GithubMiniApi from '../components/GithubMiniApi'
import styles from './download.module.css';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

function AssetLink({name,browser_download_url}) {
  return (
    <li>
    <Link
      className={clsx("button primary-button button--lg",styles.downloadButton)}
      to={browser_download_url}>
      {name}
    </Link>
    </li>
  )
}

function DownloadTabs({linuxAssets, windowsAssets, macAssets}){
  return (
    <Tabs defaultValue="linux" className={clsx(styles.downloadTabs)}  values={[
      {label: 'Linux', value: 'linux'},
      {label: 'Windows', value: 'windows'},
      {label: 'Mac', value: 'mac'},
    ]}>
    <TabItem value="linux">
    <ul>
      {linuxAssets.map((asset, idx) => (
        <AssetLink key={idx} {...asset} />
      ))}
    </ul>
    </TabItem>
    <TabItem value="windows">
    <ul>
      {windowsAssets.map((asset, idx) => (
        <AssetLink key={idx} {...asset} />
      ))}
    </ul>
    </TabItem>
    <TabItem value="mac">
    <ul>
      {macAssets.map((asset, idx) => (
        <AssetLink key={idx} {...asset} />
      ))}
    </ul>
    </TabItem>
    </Tabs>
  )
}

function DownloadHeader({version}) {
  const {siteConfig} = useDocusaurusContext();
  const versionText=version?`Version ${version}`:""
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.heroBannerTitle)}>Download</h1>
        <i className={clsx("hero__subtitle", styles.heroBannerSubtitle)}>{versionText}</i>
      </div>
    </header>
  );
}


export default function Download() {
  const [releaseData, setReleaseData] = useState({});
  const [releaseLoaded, setReleaseLoaded] = useState(false);
  useEffect(async () => {
    const res=await GithubMiniApi.getLastRelease()
    const data=await res.json()
    console.log(data[0])
    setReleaseData(data[0])
    setReleaseLoaded(true)
  }, [])
  const assets=releaseData.assets || []
  const version=releaseData.tag_name || undefined


  const assetProps={
    linuxAssets: assets.filter(ass=>{
      return /linux|\.deb|\.snap|\.AppImage|\.rpm/i.test(ass.name)
    }),
    windowsAssets: assets.filter(ass=>{
      return /windows|dos|\.exe/i.test(ass.name)
    }),
    macAssets: assets.filter(ass=>{
      return /mac/i.test(ass.name)
    })
  }

  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Download`}
      description={siteConfig.tagline}>
      <DownloadHeader version={version} />
      <main class={styles.downloadMain}>
          { !releaseLoaded && <Loader/>}
          { releaseLoaded && <>
            <div className="container">
              <DownloadTabs {...assetProps}/>
            </div>
        </>}
          <a href="https://github.com/angrykoala/gaucho/releases">Check other releases</a>
      </main>
    </Layout>
  );
}
