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

  type SearchStore {
    stores: [Store]!
    total: Int!
    pages: Int!
    page: Int!
    limit: Int!
  }

  type Query {
    stores(page: Int, limit: Int, city: String): SearchStore!
    closestStores(latitude: String!, longitude: String!, limit: Int): [Store]!
  }
`;
