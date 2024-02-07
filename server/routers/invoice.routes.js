import express from 'express';
import isUserAuthorized from '../middlewares/auth.middleware.js';
import productController from '../contorollers/invoice.controller.js';

const productRouter = express.Router();

productRouter.post('/add', isUserAuthorized, productController.addInvoice);
productRouter.get('/get', isUserAuthorized, productController.getInvoices);

export default productRouter;