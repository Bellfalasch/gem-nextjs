import React from 'react';
import { Link } from '@gjensidige/nci-core-typography/lib/link';
import { PartData } from '@enonic/nextjs-adapter';

export interface Maps {
  part: PartData;
  common: any;
}

const Maps: React.FC<Maps> = ({ part, common }) => {
  const latitude = part?.config?.latitude;
  const longitude = part?.config?.longitude;
  const zoom = part?.config?.zoom;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude}%2C${latitude}%2C${longitude}%2C${latitude}&amp;layer=mapnik&amp;marker=${latitude}%2C${longitude}`;
  const largeMap = `https://www.openstreetmap.org/?mlat=${latitude}&amp;mlon=${longitude}#map=${zoom}/${latitude}/${longitude}`;
  console.log("console.log part", part)


  return (
    <>
      <iframe
        className='OpenMap'
        style={{ width: '100%', height: '400px', backgroundColor: 'black' }}
        src={src}
        >
        </iframe>
      <Link href={largeMap}>Vis større kart</Link>
    </>
  );
};

export default Maps;
