import express from 'express'
import ResponsiblesController from '../controllers/responsibles'
import db from '../models'

const responsiblesController = new ResponsiblesController(db.responsible);
const router = express.Router();

router.route('/')
    .get((req, res, next) => responsiblesController.findAll(req, res, next))
    .post((req, res, next) => responsiblesController.save(req, res, next));

router.route('/:id')
    .get((req, res, next) => responsiblesController.findOne(req, res, next))
    .put((req, res, next) => responsiblesController.update(req, res, next))
    .delete((req, res, next) => responsiblesController.delete(req, res, next));


export default router;