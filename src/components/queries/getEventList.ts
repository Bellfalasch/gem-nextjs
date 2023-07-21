import { APP_NAME_UNDERSCORED } from "@enonic/nextjs-adapter";

const getEventList = `
  query ($path:ID!, $order:String) {
    guillotine {
      getSite {
        displayName
      }
      get(key:$path) {
        displayName
        children(sort: $order) {
          _path(type: siteRelative)
          _id
          type
          displayName
          ... on ${APP_NAME_UNDERSCORED}_Event {
            data {
              theme
              description
              location
              startDateTime
              endDateTime
              image {
                ... on media_Image {
                  imageUrl(type: absolute, scale: "width(1000)")
                }
              }
            }
          }
          parent {
            _path(type: siteRelative)                                                           
          }
        }
      }
    }
  }
`;

export default getEventList;
