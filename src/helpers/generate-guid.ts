import { faker } from "@faker-js/faker";
import ShortUniqueId from "short-unique-id";

export const generateGuid = () => faker.datatype.uuid();

export const generateShortGuid = () => new ShortUniqueId()();
