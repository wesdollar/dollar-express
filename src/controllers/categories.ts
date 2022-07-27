import { Request, Response } from "express";
import Joi from "joi";
import { errorResponse } from "../helpers/error-response";
import { validateData } from "../helpers/validate-data";
import { getCategories } from "../services/categories/get-categories";
import { getProductsByCategoryId } from "../services/products/get-products-by-category-id";

export const getTopLevelCategories = async (req: Request, res: Response) => {
  try {
    const categories = await getCategories();

    return res.json(categories);
  } catch (error) {
    return res
      .status(httpStatusCodes.serverError)
      .json(errorResponse(error, httpStatusCodes.serverError));
  }
};

export const getSubCategories = async (req: Request, res: Response) => {
  const { parentCategoryId } = req.params;

  const validatedData = validateData(
    { parentCategoryId: Joi.string().required() },
    { parentCategoryId }
  );

  if (validatedData.error) {
    return res
      .json(httpStatusCodes.badRequest)
      .json(
        errorResponse(
          `data validation error`,
          httpStatusCodes.badRequest,
          validatedData.error
        )
      );
  }

  try {
    const categories = await getCategories(parentCategoryId);

    return res.json(categories);
  } catch (error) {
    return res
      .status(httpStatusCodes.serverError)
      .json(errorResponse(error, httpStatusCodes.serverError));
  }
};

export const getProducts = async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  const validatedData = validateData(
    { categoryId: Joi.string().required() },
    { categoryId }
  );

  if (validatedData.error) {
    return res
      .status(httpStatusCodes.badRequest)
      .json(
        errorResponse(
          `data validation error`,
          httpStatusCodes.badRequest,
          validatedData.error
        )
      );
  }

  try {
    const products = await getProductsByCategoryId(categoryId);

    return res.json(products);
  } catch (error) {
    return res
      .status(httpStatusCodes.serverError)
      .json(errorResponse(error, httpStatusCodes.serverError));
  }
};
