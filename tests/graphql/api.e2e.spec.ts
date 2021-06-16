import request from 'supertest';
import { app } from '../../src/bin/app';

describe('GraphQl e2e test', () => {
  it('/graphql (QUERY) stores', () =>
    request(app)
      .post('/graphql')
      .send({
        query: `
      {
        stores {
          city
          uuid
        }
      }
    `,
      })
      .expect(200)
      .expect(({ body }) =>
        expect(body.data).toMatchObject({
          stores: expect.arrayContaining([
            expect.objectContaining({
              city: expect.any(String),
              uuid: expect.any(String),
            }),
          ]),
        }),
      ));

  it('/graphql (QUERY) closest stores', () =>
    request(app)
      .post('/graphql')
      .send({
        query: `
        {
          closestStores(latitude: "33.233445", longitude: "55.122334") {
            city
            uuid
          }
        }
      `,
      })
      .expect(200)
      .expect(({ body }) =>
        expect(body.data).toMatchObject({
          closestStores: expect.arrayContaining([
            expect.objectContaining({
              city: expect.any(String),
              uuid: expect.any(String),
            }),
          ]),
        }),
      ));
});
