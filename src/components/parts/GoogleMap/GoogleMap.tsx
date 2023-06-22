import React from 'react';
import { APP_NAME, PartData } from '@enonic/nextjs-adapter';
import Script from 'next/script';

import styles from './GoogleMap.module.css';

export const GOOGLE_MAP_PART_NAME = `${APP_NAME}:googlemap`;

export interface GoogleMapData {
  part: PartData;
  common: any;
}

const GoogleMap: React.FC<GoogleMapData> = ({ part, common }) => {
  const apiKey = part?.config?.apiKey;
  const latitude = part?.config?.latitude;
  const longitude = part?.config?.longitude;
  const zoom = part?.config?.zoom;

  // Your Google Maps rendering logic goes here

  return (
    <>
      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"
        strategy="lazyOnload"
        onLoad={() => {
          console.log(`script loaded correctly, window.FB has been populated`);

          const theMap = document.getElementsByClassName('GoogleMap');

          const theNewMap = theMap[0];

          const lng = theNewMap.getAttribute('data-long');

          const lat = theNewMap.getAttribute('data-lata');

          const map = new google.maps.Map(theNewMap, {
            // @ts-ignore
            center: { lat: Number(lat), lng: Number(lng) },
            zoom: 10
          });

          const marker = new google.maps.Marker({
            // @ts-ignore
            position: { lat: Number(lat), lng: Number(lng) }
          });

          marker.setMap(map);
        }}
      />
      <div
        className="GoogleMap"
        style={{ width: '100%', height: '400px', backgroundColor: 'black' }}
        data-long={longitude}
        data-lata={latitude}
      ></div>
    </>
  );
};

export default GoogleMap;
