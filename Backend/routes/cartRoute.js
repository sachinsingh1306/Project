import express from 'express';
import { addToCart, updateCart, getUserCart } from '../controllers/cartController.js'
import authUSer from '../middleware/auth.js';

const cartRouter = express();

cartRouter.post('/get', authUSer, getUserCart)
cartRouter.post('/add', authUSer, addToCart)
cartRouter.post('/update', authUSer, updateCart)

export default cartRouter;