import React from 'react';

const WeatherWidget: React.FC = () => {
  return (
    <div>
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
