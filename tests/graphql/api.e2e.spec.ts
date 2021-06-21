import { dbRunner } from './../utils/db.runner';
import request from 'supertest';
import { app } from '../../src/bin/app';

describe('GraphQl e2e test', () => {
  dbRunner();

  it('should be defiend', () => {
    expect(app).toBeDefined();
  });

  it('/graphql (QUERY) stores', () =>
    request(app)
      .post('/graphql')
      .send({
        query: `
        query {
          stores {
            list {
              city
              postalCode
            }
            total
            pages
            page
            limit
          }
        }
    `,
      })
      .expect(200)
      .expect(({ body }) =>
        expect(body.data).toMatchObject({
          stores: expect.objectContaining({
            list: expect.arrayContaining([
              expect.objectContaining({
                city: expect.any(String),
                postalCode: expect.any(String),
              }),
            ]),
            total: expect.any(Number),
            pages: expect.any(Number),
            page: expect.any(Number),
            limit: expect.any(Number),
          }),
        }),
      ));

  it('/graphql (QUERY) closest stores', () =>
    request(app)
      .post('/graphql')
      .send({
        query: `
        {
          closestStores(latitude: "52.081909", longitude: "5.4129834") {
            city
            postalCode
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
              postalCode: expect.any(String),
            }),
          ]),
        }),
      ));
});
