/*
 * Copyright 2021-2022 Bitergia
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import expect from '@osd/expect';

export default function ({ getService }) {
  const supertest = getService('supertest');

  describe('/menu', () => {
    it('PUT should return 200', async () => {
      const response = await supertest
        .put(`/api/_bap/menu`)
        .send({
          menu: [
            {
              name: 'Name',
              type: 'entry',
              dashboard_id: 'id',
            },
          ],
        })
        .expect(200);
    });

    it('PUT fails if entry lacks dashboard_id', async () => {
      const response = await supertest
        .put(`/api/_bap/menu`)
        .send({
          menu: [
            {
              name: 'Name',
              type: 'entry',
            },
          ],
        })
        .expect(400);

      expect(response.body.message).to.be(
        '[menu.0] missing field "dashboard_id"'
      );
    });

    it('PUT fails if entry lacks name', async () => {
      const response = await supertest
        .put(`/api/_bap/menu`)
        .send({
          menu: [
            {
              type: 'entry',
              dashboard_id: 'id',
            },
          ],
        })
        .expect(400);

      expect(response.body.message).to.be(
        '[menu.0] missing field "name"'
      );
    });

    it('PUT fails if entry lacks type', async () => {
      const response = await supertest
        .put(`/api/_bap/menu`)
        .send({
          menu: [
            {
              name: 'Name',
              dashboard_id: 'id',
            },
          ],
        })
        .expect(400);

      expect(response.body.message).to.be(
        '[menu.0] missing field "type"'
      );
    });

    it('PUT fails if type is invalid', async () => {
      const response = await supertest
        .put(`/api/_bap/menu`)
        .send({
          menu: [
            {
              name: 'Name',
              dashboard_id: 'id',
              type: 'wrong type',
            },
          ],
        })
        .expect(400);

      expect(response.body.message).to.contain(
        '[menu.0.type]: types that failed validation'
      );
    });

    it('PUT fails if key is invalid', async () => {
      const response = await supertest
        .put(`/api/_bap/menu`)
        .send({
          menu: [
            {
              name: 'Name',
              dashboard_id: 'id',
              type: 'entry',
              invalid: true,
            },
          ],
        })
        .expect(400);

      expect(response.body.message).to.be(
        'wrong key "invalid" at [menu.0]'
      );
    });

    it('GET should return 200', async () => {
      const response = await supertest
        .get(`/api/_bap/menu`)
        .expect(200);

      expect(response.body).to.have.property('data');
      expect(response.body.data).to.have.property('menu');
    });
  });
}
