import {
  CATCH_ALL,
  ComponentRegistry,
} from "@enonic/nextjs-adapter/ComponentRegistry";
import { commonQuery, commonVariables } from "./queries/common";
import PropsView from "./views/Props";
import { APP_NAME } from "@enonic/nextjs-adapter";
import MainPage from "../pages/Main";
import ChildList, {
  childListProcessor,
  getChildList,
} from './parts/ChildList/ChildList';
import TwoColumnLayout from './layouts/TwoColumnLayout';
import ThreeColumnLayout from './layouts/ThreeColumnLayout';
import GoogleMap from './parts/GoogleMap/GoogleMap';
import Countdown from './parts/CountDown/CountDown';
import Image from './parts/Image/Image';
import Faq from './parts/Faq/Faq';
import WeatherWidget from './parts/WeatherWidget/WeatherWidget';

// Event
import getEvent from './queries/getEvent';
import Event from './parts/Event/Event';

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
  processor: childListProcessor,
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

/*
// *********************
// Debug
// *********************
ComponentRegistry.addContentType(CATCH_ALL, {
    view: PropsView
});
*/
