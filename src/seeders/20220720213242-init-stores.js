"use strict";

const tableName = "Stores";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      tableName,
      [
        {
          name: "El Dorado",
          progStoreId: "74635",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "El Dorado",
          progStoreId: "74632",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Phish Dry Goods",
          progStoreId: "87364",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(tableName, null, {});
  },
};
