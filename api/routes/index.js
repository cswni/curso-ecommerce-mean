import routerx from 'express-promise-router';
import User from './User';

const router = routerx();

//User routes
router.use('/users',User);

export default router;