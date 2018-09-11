import { Router, Request, Response, NextFunction } from 'express'
import { employeeService, companyService } from '../services'

const router = Router()

router.get('/employees', async (req: Request, res: Response, next: NextFunction) => {
  const people = await employeeService.getAllAvailable()
  res.send(people)
})

router.post('/employees', async (req: Request, res: Response, next: NextFunction) => {
  const newEmployee = await employeeService.create(req.body)
  if (req.body.companyId) {
    await companyService.addEmployee(req.body.companyId, newEmployee._id.toString())
  }
  res.status(201).send(newEmployee)
})

export default router
