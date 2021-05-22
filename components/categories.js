import { v4 as uuidv4 } from "uuid";

const categories = (items) => {
  return {
    [uuidv4()]: {
      name: "To do",
      items: items,
    },
    [uuidv4()]: {
      name: "In Progress",
      items: [],
    },
    [uuidv4()]: {
      name: "Done",
      items: [],
    },
  };
};

export default categories;
