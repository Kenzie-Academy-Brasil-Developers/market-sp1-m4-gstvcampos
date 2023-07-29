import { NextFunction, Request, Response } from "express";
import { products } from "./database";
import { Product } from "./interfaces";

export const checkNameExists = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const { name } = req.body;
  if (!name) return next();

  const foundProduct: Product | undefined = products.find(
    (product: Product): boolean => product.name === name
  );

  if (foundProduct) {
    return res.status(409).json({ message: "Product already registered." });
  }

  return next();
};

export const checkIdExists = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const productIndex: number = products.findIndex(
    (product: Product): boolean => product.id === Number(req.params.id)
  );

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found." });
  }

  res.locals.productIndex = productIndex;

  return next();
};