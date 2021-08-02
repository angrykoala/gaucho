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
      {label: 'Other', value: 'other'},
    ]}>
    <TabItem value="linux">
    <ul className={clsx(styles.downloadButtonsList)}>
      {linuxAssets.map((asset, idx) => (
        <AssetLink key={idx} {...asset} />
      ))}
    </ul>
    </TabItem>
    <TabItem value="windows">
    <ul className={clsx(styles.downloadButtonsList)}>
      {windowsAssets.map((asset, idx) => (
        <AssetLink key={idx} {...asset} />
      ))}
    </ul>
    </TabItem>
    <TabItem value="mac">
    <ul className={clsx(styles.downloadButtonsList)}>
      {macAssets.map((asset, idx) => (
        <AssetLink key={idx} {...asset} />
      ))}
    </ul>
    </TabItem>
    <TabItem value="other">
    <ul className={clsx(styles.otherDownloadsList)}>
      <li>
        <a href="https://snapcraft.io/gaucho" target="_blank" rel="noopener noreferrer"><img src="https://snapcraft.io/static/images/badges/en/snap-store-black.svg" alt="Get it from the Snap Store"/></a>
      </li>
      <li>
        <a href="https://www.softpedia.com/get/System/System-Miscellaneous/Gaucho.shtml">Softpedia</a>
      </li>
    </ul>
    </TabItem>
    </Tabs>
  )
}

function DownloadHeader({version, downloadCount}) {
  const {siteConfig} = useDocusaurusContext();
  const versionText=version?`Version ${version}`:""
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={clsx('container', styles.bannerTitleContainer)}>
        <h1 className={clsx("hero__title", styles.heroBannerTitle)}>Download</h1>
        <i className={clsx("hero__subtitle", styles.heroBannerSubtitle)} title={`${downloadCount} Downloads`}>{versionText}</i>
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

  const downloadCount=assets.map(a=>a.download_count || 0).reduce((a,b)=>a+b, 0)

  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Download`}
      description={siteConfig.tagline}>
      <DownloadHeader version={version} downloadCount={downloadCount} />
      <main class={styles.downloadMain}>
          <div className="row">
              <div className={clsx('col col--6')}>
              { !releaseLoaded && <Loader/>}
              { releaseLoaded && <>
                <div className="container">
                  <DownloadTabs {...assetProps}/>
                </div>
                </>}
              </div>
              <div className={clsx('col col--6')}>
                <p>Gaucho is available for Linux, Windows and Mac.</p>
                <p>
                  For instructions on how to install and the differences between versions,
                  please check the <a href="/docs/getting-started/installation">Installation Guide</a>.
                </p>
                <p>
                  If you need a different version, you can compile Gaucho following the instructions
                  at <a href="/docs/advanced-guides/build-from-source">Build from source code</a> guide.
                </p>
                <a href="https://github.com/angrykoala/gaucho/releases">Check other releases</a>
              </div>
          </div>
      </main>
    </Layout>
  );
}
