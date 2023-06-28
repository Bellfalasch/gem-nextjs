import '../styles/globals.css';

import React from 'react';
import {
  FetchContentResult,
  RENDER_MODE,
  XP_REQUEST_TYPE
} from '@enonic/nextjs-adapter';
import { getUrl } from '@enonic/nextjs-adapter';
import StaticContent from '@enonic/nextjs-adapter/views/StaticContent';
import type { AppProps } from 'next/app';

import Footer from '../components/views/Footer';
import Header from '../components/views/Header';

/**
 * Wraps all rendered components
 * @param Component Usually triggering [[...contentPath]].tsx, this component is BasePage.tsx
 * @param pageProps {{common, data, meta, error}}
 */
function MyApp({ Component, pageProps }: AppProps<FetchContentResult>) {
  const isEdit = pageProps?.meta?.renderMode === RENDER_MODE.EDIT;

  console.log(JSON.stringify(pageProps.common, null, 4))

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

  return (
    <StaticContent condition={isEdit}>
      <Header
        title="🔥 Gjensidige"
        meta={pageProps.meta}
      />
      <strong>{ pageProps?.common?.get?.dataAsJson?.theme ? `theme is ${pageProps.common.get.dataAsJson.theme}` : 'not an event / no theme' }</strong>
      <main
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1rem`
        }}
      >
        <Component {...pageProps} />
      </main>
      <Footer />
    </StaticContent>
  );
}

export default MyApp;
