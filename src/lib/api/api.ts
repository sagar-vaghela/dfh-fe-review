import { PEOPLE } from "../../api-mocks/fixtures";

export const fetchPeopleAPI = async () => {
  try {
    return PEOPLE;
  } catch {
    throw new Error("Failed to fetch people");
  }
};
