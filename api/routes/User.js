import routerx from 'express-promise-router';
import userRouter from '../controllers/UserController';
import auth from '../middlewares/auth';

const router = routerx();

//User routes
router.post('/register', userRouter.register);
router.put('/update', userRouter.update);
router.post('/login', userRouter.login);
router.get('/list', auth.verifyAdmin, userRouter.list);
router.delete('/remove', userRouter.remove);

export default router;