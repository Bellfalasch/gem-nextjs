import React from "react";

import style from "./Weather.module.css";

const WeatherWidget: React.FC = () => {
  return (
    <div id="partAnchor_weather" className={style.weatherPart}>
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
