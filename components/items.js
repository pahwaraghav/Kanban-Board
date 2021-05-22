import { v4 as uuidv4 } from "uuid";

const items = [
  { id: uuidv4(), content: "First task", description: "" },
  { id: uuidv4(), content: "Second task", description: "" },
  { id: uuidv4(), content: "Third task", description: "" },
  { id: uuidv4(), content: "Fourth task", description: "" },
];

export default items;
