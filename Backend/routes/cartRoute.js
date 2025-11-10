import express from 'express';
import { addToCart, updateCart, getUserCart } from '../controllers/cartController'
import authUSer from '../middleware/auth';

const cartRouter = express();

cartRouter.post('/get', authUSer, getUserCart)
cartRouter.post('/add', authUSer, addToCart)
cartRouter.post('/update', authUSer, updateCart)

export default cartRouter;