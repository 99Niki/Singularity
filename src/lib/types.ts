export type City = "New York" | "Los Angeles" | "Chicago" | "San Francisco" | "Las Vegas";
export type BudgetMode = "person" | "group";

export interface Stop {
  id: string;
  day: number;
  time: string;
  duration: string;
  title: string;
  neighborhood: string;
  description: string;
  category: "Explore" | "Food & drink" | "Outdoors";
  estimate: number;
  image: string;
}

export interface BudgetCategory {
  label: string;
  amount: number;
  note: string;
  color: string;
}
