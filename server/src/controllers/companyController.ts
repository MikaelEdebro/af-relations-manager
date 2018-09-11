import { Router, Request, Response, NextFunction } from 'express'
import { companyService } from '../services'

const router = Router()

router.get('/companies', async (req: Request, res: Response, next: NextFunction) => {
  const companies = await companyService.getAll()
  res.send(companies)
})

router.post('/companies', async (req: Request, res: Response, next: NextFunction) => {
  const newCompany = await companyService.create(req.body)
  res.status(201).send(newCompany)
})

router.put('/companies/:id', async (req: Request, res: Response, next: NextFunction) => {
  const editedCompany = await companyService.edit(req.params.id, req.body)
  res.send(editedCompany)
})

router.delete(
  '/companies/:id/:employeeId',
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params)
    const editedCompany = await companyService.removeEmployee(req.params.id, req.params.employeeId)
    console.log(editedCompany)
    res.send(editedCompany)
  }
)

export default router
