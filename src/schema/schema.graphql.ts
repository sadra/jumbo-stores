const { gql } = require('apollo-server');

export const schema = gql`
  type Location {
    coordinates: [Float]!
  }

  type Store {
    uuid: String!
    city: String!
    postalCode: String!
    street: String!
    street2: String!
    street3: String!
    addressName: String!
    location: Location!
    complexNumber: String!
    showWarningMessage: Boolean!
    todayOpen: String!
    locationType: String!
    sapStoreID: String!
    todayClose: String!
  }

  type Query {
    stores(offset: Int, limit: Int, city: String): [Store]!
    closestStores(latitude: String!, longitude: String!, limit: Int): [Store]!
  }
`;
