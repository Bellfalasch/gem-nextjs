import { PartData } from "@enonic/nextjs-adapter";
import { Link } from "@gjensidige/nci-core-typography/lib/link";
import { Title } from "@gjensidige/nci-core-typography/lib/title";
import React, { useEffect, useState } from "react";

import style from "./Geomaps.module.css";

export interface GeoMapsProps {
  part: PartData;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data: any;
}

const Geomaps: React.FC<GeoMapsProps> = ({ part, data }) => {
  const location = data?.get?.data?.location as string;
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const zoom = part?.config?.zoom;

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${location}&format=json&addressdetails=1&limit=1`
        );

        const data = await response.json();
        if (data.length > 0) {
          setLatitude(parseFloat(data[0].lat));
          setLongitude(parseFloat(data[0].lon));
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [location]);

  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude}%2C${latitude}%2C${longitude}%2C${latitude}&amp;layer=mapnik&amp;marker=${latitude}%2C${longitude}`;
  const largeMap = `https://www.openstreetmap.org/?mlat=${latitude}&amp;mlon=${longitude}#map=${zoom}/${latitude}/${longitude}`;

  return (
    <div id="partAnchor_maps" className={style.mapFrame}>
      <Title tag="h2">Directions</Title>
      {latitude !== null && longitude !== null ? (
        <>
          <iframe className={style.OpenMap} src={src}></iframe>
          <Link href={largeMap} target="_blank" rel="noopener noreferrer">
            Vis større kart
          </Link>
        </>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default Geomaps;
