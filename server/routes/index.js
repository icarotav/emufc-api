import express from 'express'
import usersRoutes from './users'
import placesRoutes from './places'
import responsiblesRoutes from './responsibles'

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/places', placesRoutes);
router.use('/responsibles', responsiblesRoutes);

router.get('/', (req, res, next) => {
  res.send({index : 'index route'});
});

export default router;
