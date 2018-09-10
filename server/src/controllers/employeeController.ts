import { Router, Request, Response, NextFunction } from 'express'
import { employeeService } from '../services'

const router = Router()

router.get('/employees', async (req: Request, res: Response, next: NextFunction) => {
  const people = await employeeService.getAll()
  res.send(people)
})

router.post('/employees', async (req: Request, res: Response, next: NextFunction) => {
  const newEmployee = await employeeService.create(req.body)
  res.status(201).send(newEmployee)
})

export default router
