import express, { Application, json } from "express";
import { checkIdExists, checkNameExists } from "./middlewares";
import {
  createProduct,
  deleteProduct,
  readProducts,
  readProductsById,
  updateProduct,
} from "./logics";

const app: Application = express();
app.use(json());

app.post("/products", checkNameExists, createProduct);
app.get("/products", readProducts);
app.get("/products/:id",checkIdExists, readProductsById);
app.patch("/products/:id",checkIdExists, checkNameExists, updateProduct);
app.delete("/products/:id",checkIdExists, deleteProduct);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running in localhost:3000`);
});
