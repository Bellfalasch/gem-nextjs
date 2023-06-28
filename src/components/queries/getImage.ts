const getImage = `
    {
      image {
        ... on media_Image {
          imageUrl(type: absolute, scale: "width(200)")
        }
      }
    }
`;

export default getImage;