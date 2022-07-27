import { faker } from "@faker-js/faker";
import { generateGuid, generateShortGuid } from "./generate-guid";

jest.mock("@faker-js/faker", () => ({
  faker: {
    datatype: {
      uuid: jest.fn(() => "12345"),
    },
  },
}));

it("should call faker uuid", () => {
  generateGuid();

  expect(faker.datatype.uuid).toBeCalled();
});

it("should return uuid", () => {
  const response = generateGuid();

  expect(response).toEqual("12345");
});

it("should return a short GUID", () => {
  const id = generateShortGuid();

  expect(id.length).toBe(6);
});
