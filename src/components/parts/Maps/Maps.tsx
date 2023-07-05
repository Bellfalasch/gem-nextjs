import { PartData } from "@enonic/nextjs-adapter";
import { Link } from "@gjensidige/nci-core-typography/lib/link";
import React from "react";

import style from "./Maps.module.css";

export interface MapsProps {
  part: PartData;
}

const Maps: React.FC<MapsProps> = ({ part }) => {
  const latitude = part?.config?.latitude;
  const longitude = part?.config?.longitude;
  const zoom = part?.config?.zoom;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude}%2C${latitude}%2C${longitude}%2C${latitude}&amp;layer=mapnik&amp;marker=${latitude}%2C${longitude}`;
  const largeMap = `https://www.openstreetmap.org/?mlat=${latitude}&amp;mlon=${longitude}#map=${zoom}/${latitude}/${longitude}`;

  return (
    <div id="partAnchor_maps" className={style.mapFrame}>
      <iframe className={style.OpenMap} src={src}></iframe>
      <Link href={largeMap}>Vis større kart</Link>
    </div>
  );
};

export default Maps;
