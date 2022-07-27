import { timestamp } from "./timestamp";

const date = "2020-01-01T00:00:00.000Z";

jest.mock("moment", () => {
  return () => jest.requireActual("moment")(date);
});

it("should call the things and return date", () => {
  const result = timestamp();

  expect(result).toEqual(date);
});
