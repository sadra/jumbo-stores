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
    longitude: String!
    latitude: String!
    location: Location!
    complexNumber: String!
    showWarningMessage: Boolean!
    todayOpen: String!
    locationType: String!
    sapStoreID: String!
    todayClose: String!
  }

  type Query {
    stores: [Store]!
    closestStores(latitude: String!, longitude: String!, limit: Int): [Store]!
  }
`;
