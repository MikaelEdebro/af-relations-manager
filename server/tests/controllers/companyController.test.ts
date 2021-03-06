import request from 'supertest'
import app from '../../src/app'
import mongoose from 'mongoose'
import { Company, Employee } from '../../src/models'
import { companyService, employeeService } from '../../src/services'
import testKeys from '../config/testKeys'

describe('companyController', () => {
  let db
  beforeAll(() => {
    db = mongoose.connect(
      testKeys.mongoURI,
      { useNewUrlParser: true }
    )
  })

  afterEach(async () => {
    await Company.deleteMany({})
    await Employee.deleteMany({})
  })

  afterAll(async () => {
    await mongoose.disconnect()
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

  test('POST to /companies creates new company', done => {
    request(app)
      .post('/api/companies')
      .send({ name: 'New Frontier Inc' })
      .expect(201)
      .end((err, { body }) => {
        expect(body.name).toEqual('New Frontier Inc')
        done()
      })
  })

  test('PUT to /companies/:id updates correct company', async done => {
    const employees = [
      await employeeService.create({ name: 'Mikael Edebro' }),
      await employeeService.create({ name: 'Maria Edebro' }),
    ]
    const company = await companyService.create({ name: 'Edebro Consulting AB' })
    if (!company) return

    request(app)
      .put('/api/companies/' + company._id.toString())
      .send({ name: 'New Edebro AB', employees })
      .expect(200)
      .end((err, { body }) => {
        expect(body.name).toEqual('New Edebro AB')
        expect(body.employees).toHaveLength(2)
        expect(body.employees[0].name).toEqual('Mikael Edebro')
        done()
      })
  })
})
