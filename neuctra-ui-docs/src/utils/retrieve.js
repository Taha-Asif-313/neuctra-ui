
import { Components } from "./neuctraUiComponents";

export function retrieveComponents(query) {
  query = query.toLowerCase();
  return Components.filter(c =>
    c.name.toLowerCase().includes(query) ||
    c.description.toLowerCase().includes(query)
  );
}








/* ===== Custom Scrollbar ===== */
/* Thin scrollbar for both vertical and horizontal */
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

/* Scrollbar track (background behind the thumb) */
::-webkit-scrollbar-track {
  background-color: #000; /* Black track */
}

/* Scrollbar thumb (the draggable part) */
::-webkit-scrollbar-thumb {
  background-color: var(--primary); /* Primary color */
  border-radius: 9999px; /* Fully rounded */
}

/* Hover effect for the thumb */
::-webkit-scrollbar-thumb:hover {
  background-color: var(--primary); /* Slightly darker on hover */
}