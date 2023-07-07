import { Title } from "@gjensidige/nci-core-typography/lib/title";
import React from "react";

import style from "./Weather.module.css";

const WeatherWidget: React.FC = () => {
  return (
    <div id="partAnchor_weatherwidget" className={style.weatherPart}>
      <Title tag="h2" size="2">
        Været
      </Title>
      <iframe
        src="https://www.yr.no/nb/innhold/1-72837/table.html"
        title="Weather Widget"
        width="100%"
        height="515px"
      />
    </div>
  );
};

export default WeatherWidget;
