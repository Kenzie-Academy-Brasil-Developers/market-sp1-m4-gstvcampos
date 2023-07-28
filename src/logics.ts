import { Request, Response } from "express";
import { Product } from "./interfaces";
import { market } from "./database";

let id = 1;

const totalPrice = (array: Product[]): number => {
  return array.reduce((accounting, currentValue) => accounting + currentValue.price, 0);
};

const createProduct = (req: Request, res: Response): Response => {
  const expirationDate: Date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365);

  const newProduct: Product = {
    id: id++,
    ...req.body,
    expirationDate,
  };

  market.push(newProduct);

  return res.status(201).json(newProduct);
};

const readProducts = (req: Request, res: Response): Response => {
  return res.status(200).json({ total: totalPrice(market), market });
};

const readProductsById = (req: Request, res: Response): Response => {
  const { productIndex } = res.locals;

  return res.status(200).json(market[productIndex]);
};

const updateProduct = (req: Request, res: Response): Response => {
  const { productIndex } = res.locals;

  const updatedProduct = (market[productIndex] = {
    ...market[productIndex],
    ...req.body,
  });

  return res.status(200).json(updatedProduct);
};

const deleteProduct = (req: Request, res: Response): Response => {
  const { productIndex } = res.locals;

  market.splice(productIndex, 1);

  return res.status(204).json();
};

export { createProduct, readProducts, readProductsById, updateProduct, deleteProduct };