import { PartData } from "@enonic/nextjs-adapter";
import { Title } from "@gjensidige/nci-core-typography/lib/title";
import React from "react";

import style from "./Weather.module.css";

export interface weatherProps {
  part: PartData;
}

const WeatherWidget: React.FC<weatherProps> = ({ part }) => {
  const locationID = part?.config?.locationID || "1-72837"; //Using default value "1-72837" for Oslo if locationID is empty
  const src = `https://www.yr.no/nb/innhold/${locationID}/table.html`;

  return (
    <div id="partAnchor_weatherwidget" className={style.weatherPart}>
      <Title tag="h2" size="2">
        Været
      </Title>
      <iframe src={src} title="Weather Widget" width="100%" height="515px" />
    </div>
  );
};

export default WeatherWidget;
