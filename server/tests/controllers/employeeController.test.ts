import request from 'supertest'
import app from '../../src/app'
import mongoose from 'mongoose'
import Employee from '../../src/models/Employee'
import { employeeService } from '../../src/services'

describe('employeeController', () => {
  let db
  beforeAll(() => {
    db = mongoose.connect(
      'mongodb://localhost:27017/af-relations-manager_test',
      { useNewUrlParser: true }
    )
  })

  afterEach(async () => {
    await Employee.deleteMany({})
  })

  afterAll(async () => {
    db.close()
  })

  test('GET to /employees fetches all employees', async done => {
    await employeeService.create({ name: 'Mikael' })
    await employeeService.create({ name: 'Sara' })

    request(app)
      .get('/api/employees')
      .expect(200)
      .end((err, { body }) => {
        expect(body).toHaveLength(2)
        expect(body[0].name).toEqual('Mikael')
        done()
      })
  })

  test('POST to /employees creates new employee', async done => {
    request(app)
      .post('/api/employees')
      .send({ name: 'Hyland Test' })
      .expect(201)
      .end((err, { body }) => {
        expect(body.name).toEqual('Hyland Test')
        done()
      })
  })
})
