/* eslint-disable require-await */
import express, { Request, Response, Router } from "express";
import { staticFilesDirectory } from "./constants/static-files-directory";
import {
  getSubCategories,
  getTopLevelCategories,
  getProducts as getCategoryProducts,
} from "./controllers/categories";
import { getProducts, getProductsBySku } from "./controllers/stores";

const apiVersion = "v1";

/** route declarations */
export const routes = (): Router => {
  const router = express.Router();

  router.get(`/`, (req: Request, res: Response) => {
    return res.sendFile(`${__dirname}/${staticFilesDirectory}/index.html`);
  });

  router.get(`/${apiVersion}/health-check`, (req: Request, res: Response) => {
    return res.json({ healthy: true });
  });

  router.get(
    `/${apiVersion}/store/:storeId/products`,
    (req: Request, res: Response) => getProducts(req, res)
  );

  router.get(
    `/${apiVersion}/store/:storeId/products/:sku`,
    (req: Request, res: Response) => getProductsBySku(req, res)
  );

  router.get(`/${apiVersion}/category`, (req: Request, res: Response) =>
    getTopLevelCategories(req, res)
  );

  router.get(
    `/${apiVersion}/category/:parentCategoryId`,
    (req: Request, res: Response) => getSubCategories(req, res)
  );

  router.get(
    `/${apiVersion}/category/:categoryId/products`,
    (req: Request, res: Response) => getCategoryProducts(req, res)
  );

  return router;
};
