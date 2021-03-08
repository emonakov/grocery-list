interface GroceryItem {
  title: string;
  priority: 1 | 2 | 3 | 4 | 5;
  id: string;
  isHaving: boolean;
  statusHistory: Array<[boolean, Date]>;
}

interface GroceryState {
  items: GroceryItem[];
}
