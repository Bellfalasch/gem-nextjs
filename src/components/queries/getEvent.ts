import {APP_NAME_UNDERSCORED} from '@enonic/nextjs-adapter';

const getEvent = `
query($path:ID!){
  guillotine {
    get(key:$path) {
      displayName
      ... on ${APP_NAME_UNDERSCORED}_Event {
        data {
          startDate
          endDate
          description
          header {
           ... on media_Image {                                             
              imageUrl: imageUrl(type: absolute, scale: "width(800)")
              attachments {                                                 
                name
              }
            }
          }
        }
      }
      parent {
        _path(type: siteRelative)                                                           
      }
    }
  }
}`;

export default getEvent;