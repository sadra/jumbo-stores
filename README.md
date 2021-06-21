# Jumbo Store Code Assignement

[![Heroku](https://heroku-badge.herokuapp.com?app=jumbo-stores-sadra)](https://jumbo-stores-sadra.herokuapp.com/)

This a Node.js project, developed by Typescript and deployed on Heroku.

Demo version: [Root](https://jumbo-stores-sadra.herokuapp.com), [GraphQL](https://jumbo-stores-sadra.herokuapp.com/graphql)

- [Jumbo Store Code Assignement](#jumbo-store-code-assignement)
  - [How to Run (Locally)](#how-to-run-locally)
  - [How to Run (with Docker)](#how-to-run-with-docker)
  - [Run Test](#run-test)
  - [API](#api)
    - [Test /](#test-)
  - [GraphQL](#graphql)
    - [Search on Stores](#search-on-stores)
    - [Get Closest Stores](#get-closest-stores)

## How to Run (Locally)

0. Create a mongo database on a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or anywhere you like.

1. Just copy `.env.example` to `.env` and fill with your einviorements:

```
PORT=8000
MONGO_URL=mongodb+srv://USERNAME:PASSWORD@DB_URL/DB_NAME?retryWrites=true&w=majority
```

2. Install npm packages:

```bash
npm install
```

3. To run app just call following in your command line:

```bash
npm run start:dev
```

4. You can run project on production js too:

```bash
npm run start:rod
```

## How to Run (with Docker)

If you like to run the project with Docker, just run `docker-compose` with envs:

```bash
docker-compose up --build
```

If you have any db on the cloud you can run with your desire mongoDB URL

```bash
MONGO_URL='mongodb+srv://test:test@example.mongodb.net/test?retryWrites=true' docker-compose up --build
```

## Run Test

This tests uses `mongodb-memory-server` as a MongoDb Driver. for tests I used **Jest**, and **supertest** for the `e2e`.

To run all the tests:

```bash
npm test
```

## API

Base Route: `http://localhost:PORT`

GraphQL Route: `http://localhost:PORT/graphql`

### Test /

Route: `/`

Method: `GET`

**Response**

Status: `200`

```json
"Hi! I am Jumbo :)"
```

## GraphQL

You can access to the graphql api throw the following route:

```
https://localhost:PORT/graphql
```

The graphql is fully documented and you can check it with it's document too.

### Search on Stores

There is a featur that you can search on stores by `city` name and also paginate the results

**Query Parameters**

| Name  |  Type  | Required | Default |
| :---- | :----: | :------: | :-----: |
| page  | Number | OPTIONAL |    1    |
| limit | Number | OPTIONAL |   10    |
| city  | String | OPTIONAL |    -    |

_Request Example:_

```graphql
query {
  stores(page: 1, limit: 2, city: "Zeist") {
    list {
      city
      addressName
      postalCode
      todayOpen
      todayClose
      location {
        coordinates
      }
    }
    total
    pages
    page
    limit
  }
}
```

_Response Example:_

```json
{
  "data": {
    "stores": {
      "list": [
        {
          "city": "Zeist",
          "addressName": "Jumbo Zeist Johan van Oldenbarneveltlaan",
          "postalCode": "3705 HK",
          "todayOpen": "08:00",
          "todayClose": "21:00",
          "location": {
            "coordinates": [52.098069, 5.239731]
          }
        },
        {
          "city": "Zeist",
          "addressName": "Jumbo Zeist Korte Steijnlaan",
          "postalCode": "3701 EX",
          "todayOpen": "08:00",
          "todayClose": "21:00",
          "location": {
            "coordinates": [52.088909, 5.248135]
          }
        }
      ],
      "total": 3,
      "pages": 2,
      "page": 1,
      "limit": 2
    }
  }
}
```

**Notice:** on coordinates parameter, there are two number that indicates to points of store on the map. The first number is stands for `latitude` and the secons one is stands for `longitude`.

```json
coordinates: [
    52.088909, //latitude
    5.248135 //longitude
] =>
```

### Get Closest Stores

With tis feature you can make query on closest/nearest jumbo stores by passing your `latitude` and `longtitude` points. There is a default 5 stores limit, but you can pass your desire limit.

**Query Parameters**

| Name      |  Type  | Required | Default |
| :-------- | :----: | :------: | :-----: |
| latitude  | String |   YES    |    -    |
| longitude | String |   YES    |    -    |
| limit     | Number | OPTIONAL |    5    |

_Request Example:_

```graphql
query {
  closestStores(latitude: "52.088909", longitude: "5.248135", limit: 3) {
    city
    addressName
    postalCode
    todayOpen
    todayClose
    location {
      coordinates
    }
  }
}
```

_Response Example:_

```json
{
  "data": {
    "closestStores": [
      {
        "city": "Zeist",
        "addressName": "Jumbo Zeist Korte Steijnlaan",
        "postalCode": "3701 EX",
        "todayOpen": "08:00",
        "todayClose": "21:00",
        "location": {
          "coordinates": [52.088909, 5.248135]
        }
      },
      {
        "city": "Zeist",
        "addressName": "Jumbo Zeist Johan van Oldenbarneveltlaan",
        "postalCode": "3705 HK",
        "todayOpen": "08:00",
        "todayClose": "21:00",
        "location": {
          "coordinates": [52.098069, 5.239731]
        }
      },
      {
        "city": "Zeist",
        "addressName": "Jumbo Zeist Laan van Vollenhove",
        "postalCode": "3706 AL",
        "todayOpen": "08:00",
        "todayClose": "21:00",
        "location": {
          "coordinates": [52.1009, 5.22216]
        }
      }
    ]
  }
}
```
