import * as models from "../../models/index";

export const getCategories = async (parentCategoryId: string | null = null) => {
  try {
    // @ts-ignore TODO: typing
    const categories = await models.Category.findAll({
      where: { parentCategoryId },
    });

    return Promise.resolve(categories);
  } catch (error) {
    return Promise.reject(error);
  }
};
