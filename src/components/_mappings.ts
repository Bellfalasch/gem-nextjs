import { APP_NAME } from "@enonic/nextjs-adapter";
import { ComponentRegistry } from "@enonic/nextjs-adapter/ComponentRegistry";

import ThreeColumnLayout from "./layouts/ThreeColumnLayout";
import TwoColumnLayout from "./layouts/TwoColumnLayout";
import ChildList, { getChildList } from "./parts/ChildList/ChildList";
import Countdown from "./parts/CountDown/CountDown";
import Event from "./parts/Event/Event";
import Faq from "./parts/Faq/Faq";
import GoogleMap from "./parts/GoogleMap/GoogleMap";
import Image from "./parts/Image/Image";
import WeatherWidget from "./parts/WeatherWidget/WeatherWidget";
import { commonQuery, commonVariables } from "./queries/common";
import getEvent from "./queries/getEvent";
import MainPage from "../pages/Main";
import Rsvp from "../parts/Rsvp/Rsvp";

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
ComponentRegistry.addPart(`${APP_NAME}:child-list`, {
  query: getChildList,
  view: ChildList,
});

ComponentRegistry.addPart(`${APP_NAME}:googlemap`, {
  view: GoogleMap,
});

ComponentRegistry.addPart(`${APP_NAME}:countdown`, {
  view: Countdown,
});

ComponentRegistry.addPart(`${APP_NAME}:weatherwidget`, {
  view: WeatherWidget,
});

ComponentRegistry.addPart(`${APP_NAME}:event`, {
  query: getEvent,
  view: Event,
});

ComponentRegistry.addPart(`${APP_NAME}:image`, {
  view: Image,
});

ComponentRegistry.addPart(`${APP_NAME}:faq`, {
  view: Faq,
});

ComponentRegistry.addPart(`${APP_NAME}:rsvp`, {
  view: Rsvp,
});
