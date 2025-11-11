export type SandwichAction =
  | { type: 'sandwich/addIngredient'; payload: string }
  | { type: 'sandwich/reset' };
