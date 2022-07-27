"use strict";

const { faker } = require("@faker-js/faker");
const tableName = "Categories";

module.exports = {
  async up(queryInterface) {
    const records = [];

    let i = 0;

    while (i <= 80) {
      records.push({
        name: faker.commerce.department(),
        parentCategoryId: faker.helpers.maybe(
          () => faker.datatype.number({ min: 1, max: 80 }),
          0.3
        ),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      i++;
    }

    await queryInterface.bulkInsert(tableName, [...records], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(tableName, null, {});
  },
};
