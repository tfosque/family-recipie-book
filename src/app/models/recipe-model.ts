
// user.model.ts
export interface Recipe {
    ingredients: Ingredient[];
    desc: string;
    instructions: string;
  }

  export interface Ingredient {
    title: string;
    desc: string;
    uom: string;
    foodGroup: string;
  }

  export interface Instructions {
    steps: Steps[];
  }

  export interface Steps {
    lineNumber: number;
    desc: string;
  }