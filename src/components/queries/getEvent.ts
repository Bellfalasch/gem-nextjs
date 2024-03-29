import { APP_NAME_UNDERSCORED } from "@enonic/nextjs-adapter";

const getEvent = `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      ... on ${APP_NAME_UNDERSCORED}_Event {
        data {
          theme
          description
          location
          startDateTime
          endDateTime
          showCountdown
          attendees
          openForRegistration
          closedForRegistration
          allergy
          eventPrice
        }
      }
      parent {
        _path(type: siteRelative)                                                           
      }
    }
  }
}`;

export default getEvent;
