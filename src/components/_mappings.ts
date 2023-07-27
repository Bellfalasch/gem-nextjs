import { APP_NAME } from "@enonic/nextjs-adapter";
import { ComponentRegistry } from "@enonic/nextjs-adapter/ComponentRegistry";

import ThreeColumnLayout from "./layouts/ThreeColumnLayout";
import TwoColumnLayout from "./layouts/TwoColumnLayout";
import Event from "./parts/Event/Event";
import EventList from "./parts/EventList/EventList";
import Faq from "./parts/Faq/Faq";
import Geomaps from "./parts/Geomaps/Geomaps";
import Image from "./parts/Image/Image";
import Maps from "./parts/Maps/Maps";
import Rsvp from "./parts/Rsvp/Rsvp";
import WeatherWidget from "./parts/WeatherWidget/WeatherWidget";
import { commonQuery, commonVariables } from "./queries/common";
import getEvent from "./queries/getEvent";
import getEventList from "./queries/getEventList";
import getImage from "./queries/getImage";
import MainPage from "../pages/Main";

// You can set common query for all views here
ComponentRegistry.setCommonQuery([commonQuery, commonVariables]);

// *********************
// Content type mappings
// *********************
/*ComponentRegistry.addContentType(`${APP_NAME}:person`, {
  query: getPerson,
  view: Person,
});*/

// *********************
// Page mappings
// *********************
ComponentRegistry.addPage(`${APP_NAME}:main`, {
  view: MainPage,
});

// *********************
// Layout mappings
// *********************
ComponentRegistry.addLayout(`${APP_NAME}:2-column`, {
  view: TwoColumnLayout,
});

ComponentRegistry.addLayout(`${APP_NAME}:3-column`, {
  view: ThreeColumnLayout,
});

// *********************
// Part mappings
// *********************
ComponentRegistry.addPart(`${APP_NAME}:eventlist`, {
  query: getEventList,
  view: EventList,
});

ComponentRegistry.addPart(`${APP_NAME}:maps`, {
  view: Maps,
});

ComponentRegistry.addPart(`${APP_NAME}:geomaps`, {
  query: getEvent,
  view: Geomaps,
});

ComponentRegistry.addPart(`${APP_NAME}:weatherwidget`, {
  view: WeatherWidget,
});

ComponentRegistry.addPart(`${APP_NAME}:event`, {
  query: getEvent,
  view: Event,
});

ComponentRegistry.addPart(`${APP_NAME}:image`, {
  configQuery: getImage,
  view: Image,
});

ComponentRegistry.addPart(`${APP_NAME}:faq`, {
  view: Faq,
});

ComponentRegistry.addPart(`${APP_NAME}:rsvp`, {
  query: getEvent,
  view: Rsvp,
});
