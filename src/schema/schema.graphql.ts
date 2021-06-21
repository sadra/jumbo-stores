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
    list: [Store]!
    total: Int!
    pages: Int!
    page: Int!
    limit: Int!
  }

  type Query {
    """
    # Stores
    Search in the stores
    """
    stores(
      """
      **Optional**

      **default: 1**

      Page value must be bigger than **1**.
      """
      page: Int

      """
      **Optional**

      **default: 10**
      """
      limit: Int

      """
      **Optional**
      """
      city: String
    ): SearchStore!

    """
    # Closest Stores
    You find the closest store to you with this api
    """
    closestStores(
      """
      **Mandatory**
      """
      latitude: String!

      """
      **Mandatory**
      """
      longitude: String!

      """
      **Optional**

      **default: 5**
      """
      limit: Int
    ): [Store]!
  }
`;
