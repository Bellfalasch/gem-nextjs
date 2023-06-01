import React, { useEffect } from 'react';
import Script from 'next/script';
import { APP_NAME, PartData } from '@enonic/nextjs-adapter';
import styles from './CustomWidget.module.css';

export interface TaxiData {
  part: PartData;
  common: any;
}

const Taxi: React.FC<TaxiData> = ({ part, common }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://ottekstern.oslotaxi.no/web-booking/js/wb-assets.js?central=oslo';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Custom widget logic goes here

  return (
    <>
      <Script
        src='https://ottekstern.oslotaxi.no/web-booking/js/wb-assets.js?central=oslo'
        strategy='lazyOnload'
        onLoad={() => {
          console.log('Custom widget script loaded correctly');

          // Custom widget logic goes here
        }}
      />
      <div className='CustomWidget'>
        {/* Custom widget content goes here */}
      </div>
    </>
  );
};

export default Taxi;
