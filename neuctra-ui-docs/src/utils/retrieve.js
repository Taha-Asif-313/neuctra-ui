
import { Components } from "./neuctraUiComponents";

export function retrieveComponents(query) {
  query = query.toLowerCase();
  return Components.filter(c =>
    c.name.toLowerCase().includes(query) ||
    c.description.toLowerCase().includes(query)
  );
}