import request from 'supertest'
import app from '../../src/app'
import mongoose from 'mongoose'
import { Company } from '../../src/models'
import { companyService } from '../../src/services'

describe('companyController', () => {
  let db
  beforeAll(() => {
    db = mongoose.connect(
      'mongodb://localhost:27017/af-relations-manager_test',
      { useNewUrlParser: true }
    )
  })

  afterEach(async () => {
    await Company.deleteMany({})
  })

  afterAll(async () => {
    db.close()
  })

  test('GET to /companies fetches all companies', async done => {
    await companyService.create({ name: 'Edebro Consulting AB' })

    request(app)
      .get('/api/companies')
      .expect(200)
      .end((err, { body }) => {
        expect(body).toHaveLength(1)
        expect(body[0].name).toEqual('Edebro Consulting AB')
        done()
      })
  })

  test('POST to /companies creates new company', async done => {
    request(app)
      .post('/api/companies')
      .send({ name: 'New Frontier Inc' })
      .expect(201)
      .end((err, { body }) => {
        expect(body.name).toEqual('New Frontier Inc')
        done()
      })
  })
})
