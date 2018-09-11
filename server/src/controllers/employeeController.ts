import { Router, Request, Response, NextFunction } from 'express'
import { employeeService, companyService } from '../services'
import { validationResult } from 'express-validator/check'
import validateEmployee from '../middleware/validation/validateEmployee'

const router = Router()

router.get('/employees', async (req: Request, res: Response, next: NextFunction) => {
  const people = await employeeService.getAllAvailable()
  res.send(people)
})

router.post(
  '/employees',
  validateEmployee,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const newEmployee = await employeeService.create(req.body)
    if (req.body.companyId && newEmployee) {
      await companyService.addEmployee(req.body.companyId, newEmployee._id.toString())
    }
    res.status(201).send(newEmployee)
  }
)

export default router
