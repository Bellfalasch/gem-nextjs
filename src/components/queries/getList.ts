const getList = `
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
            displayName
        }
      }
    }
  }
`;

export default getList;
