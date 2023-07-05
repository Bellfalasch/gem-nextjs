import '../styles/globals.css';
import classNames from 'classnames';
import styles from './_app.module.css';

import React from 'react';
import {
  FetchContentResult,
  RENDER_MODE,
  XP_REQUEST_TYPE
} from '@enonic/nextjs-adapter';
import StaticContent from '@enonic/nextjs-adapter/views/StaticContent';
import type { AppProps } from 'next/app';
import { getUrl, MetaData, APP_NAME } from "@enonic/nextjs-adapter";

import Footer from '../components/views/Footer';
import Header from '../components/views/Header';

/**
 * Wraps all rendered components
 * @param Component Usually triggering [[...contentPath]].tsx, this component is BasePage.tsx
 * @param pageProps {{common, data, meta, error}}
 */
function MyApp({ Component, pageProps }: AppProps<FetchContentResult>) {
  const isEdit = pageProps?.meta?.renderMode === RENDER_MODE.EDIT;
  const theme = pageProps?.common?.get.dataAsJson.theme;

  let partList: Array<string> = []; //moved this one out here since the return statement was complaining 

  // BEGIN PLAYING AROUND
  // TODO: Rewrite/imrpove this, just added to see what I'm working with. Remove logging. Cleanup
  // Read from pageProps common a new little data-set I added in graphQL, pageAsJson, where you find all components on a page
  const partsOnPage = pageProps?.common?.get?.pageAsJson?.regions?.main?.components;
  //console.log(JSON.stringify(partsOnPage, null, 4))

  if (partsOnPage) {
    partsOnPage.forEach((part: { type: string; descriptor: string }) => {
      // For each component, check if it is of type "part" (as there are also text, fragment, and layout types and those we don't want)
      if (part.type === 'part') {
        // This field comes out as "com.gjensidige.internal.gem:faq", so remove the app-name and the :
        const partShortName = part.descriptor.replace(`${APP_NAME}:`, "")
        // If it is not null/undefined and NOT is the image part (might need to add more here btw?) then add it to the partList array
        if (partShortName && partShortName !== 'image') {
          partList.push(partShortName)
        }
      }
    })
    //console.log(partList); // This is it, this array contains all parts we should put in the menu!
  }
  // TODO: use partList, pass it as props down to Header, foreach item output an anchor that looks like <a href="#partAnchor_XXX"> where XXX is the array entry.
  // END PLAYING AROUND


  
  // Component rendering - for component updates in Content Studio without reloading page
  if (pageProps.meta) {
    const meta = pageProps.meta;
    if (meta.requestType === XP_REQUEST_TYPE.COMPONENT) {
      return (
        <StaticContent condition={isEdit}>
          {meta.renderMode === RENDER_MODE.NEXT ? (
            // don't wrap it in direct next access because we want to show 1 component on the page
            <Component {...pageProps} />
          ) : (
            <details data-single-component-output="true">
              <Component {...pageProps} />
            </details>
          )}
        </StaticContent>
      );
    } else if (!meta.canRender) {
      // return empty page, status is set in [[...contentPath.tsx]]
      return null;
    }
  }
  const backgroundImage = theme && theme !== 'default' ? 'url("' + getUrl(`/images/${theme}.png` + '")', pageProps.meta) : 'none';

  return (
    <StaticContent className={classNames(styles["background-theme"], styles[theme])} condition={isEdit} style={{
      backgroundImage
    }}>
      <Header
        title="🔥 Gjensidige"
        meta={pageProps.meta}
        theme={theme}
        partList={partList}
      />
      <main
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          paddingTop:`100px`,
          paddingLeft:`1rem`,
          paddingRight:`1rem`,
          paddingBottom:`1rem`,
          // padding: `1rem`,
          backgroundColor: `#ffffffee`,
          borderRadius: `10px`,
          boxShadow: `#00000044 0 0 10px`
        }}
      >
        <Component {...pageProps} />
      </main>
      <Footer />
    </StaticContent>
  );
}

export default MyApp;
