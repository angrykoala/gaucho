import React,{ useState,useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '../components/HomepageFeatures';
import GithubMiniApi from '../components/GithubMiniApi'
import styles from './download.module.css';

import Tabs from '@theme/Tabs';import TabItem from '@theme/TabItem';

function AssetLink({name,browser_download_url}) {
  return (
    <li>
    <a href={browser_download_url} download>{name}</a>
  </li>
)
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
  const version=releaseData.tag_name

  const linuxAssets=assets.filter(ass=>{
    return /linux|\.deb|\.snap|\.AppImage|\.rpm/i.test(ass.name)
  })
  const windowsAssets=assets.filter(ass=>{
    return /windows|dos|\.exe/i.test(ass.name)
  })
  const macAssets=assets.filter(ass=>{
    return /mac/i.test(ass.name)
  })

  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} Download`}
      description={siteConfig.tagline}>
      <main class={styles.downloadMain}>
        <h1>Download</h1>
          { !releaseLoaded && <div class="loader"></div>}
          { releaseLoaded && <>
            <p><i>Version {version}</i></p>

          <Tabs  defaultValue="linux"  values={[
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
        </>}
          <a href="https://github.com/angrykoala/gaucho/releases">Check all releases</a>
      </main>
    </Layout>
  );
}

// You can download Gaucho for Linux, Windows, and Mac at https://github.com/angrykoala/gaucho/releases
