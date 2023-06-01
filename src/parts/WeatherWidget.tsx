import React from 'react';
import { PartProps } from '@enonic/nextjs-adapter/views/BasePart';

interface WeatherWidgetPartProps extends PartProps {
  widgetTitle?: string;
  widgetUrl?: string;
}

const WeatherWidgetPart: React.FC<WeatherWidgetPartProps> = ({
  widgetTitle,
  widgetUrl,
}) => {
  return (
    <iframe
      src='https://www.yr.no/nb/innhold/1-72837/card.html'
      width='100%'
      height='500'
      title={widgetTitle || 'Weather Widget'}
    ></iframe>
  );
};

export default WeatherWidgetPart;
