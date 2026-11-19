import type { BudgetCategory, City, Stop } from "./types";

export const cities: City[] = ["New York", "Los Angeles", "Chicago", "San Francisco", "Las Vegas"];

// Illustrative editorial data only. No hours, routes, reviews, or prices are verified.
export const demoStops: Stop[] = [
  { id: "central-park", day: 1, time: "9:00 AM", duration: "1.5 hours", title: "A slow morning in Central Park", neighborhood: "Upper Manhattan", description: "Tree-lined paths, a coffee in hand, and a little room to wander. Start your city escape on the green side.", category: "Outdoors", estimate: 0, image: "photo-1519331379826-f10be5486c6f" },
  { id: "met", day: 1, time: "11:00 AM", duration: "2 hours", title: "Get a little lost at The Met", neighborhood: "Upper East Side", description: "Ancient worlds, iconic paintings, and unexpected favorites. Pick a few galleries and follow your curiosity.", category: "Explore", estimate: 30, image: "photo-1561214115-f2f134cc4912" },
  { id: "lunch", day: 1, time: "1:30 PM", duration: "1 hour", title: "Lunch, the New York way", neighborhood: "Upper East Side", description: "Find your neighborhood favorite over a slice or a bagel. This is an open meal break, not a restaurant reservation.", category: "Food & drink", estimate: 25, image: "photo-1513104890138-7c749659a591" },
  { id: "village", day: 2, time: "10:00 AM", duration: "2 hours", title: "Wander the West Village", neighborhood: "West Village", description: "Brownstone streets, little bookshops, and independent cafés. Leave some space for an unplanned discovery.", category: "Explore", estimate: 0, image: "photo-1518391846015-55a9cc003b25" },
  { id: "high-line", day: 2, time: "1:00 PM", duration: "1.5 hours", title: "Take the scenic route on the High Line", neighborhood: "Chelsea", description: "An elevated garden with a different perspective on the city. Enjoy public art and pockets of green along the way.", category: "Outdoors", estimate: 0, image: "photo-1485871981521-5b1fd3805eee" },
  { id: "brooklyn", day: 3, time: "9:30 AM", duration: "2 hours", title: "A Brooklyn kind of morning", neighborhood: "DUMBO", description: "Waterfront paths and skyline views, followed by a slow coffee stop. Bring your camera and your curiosity.", category: "Explore", estimate: 15, image: "photo-1518391846015-55a9cc003b25" },
];

export const demoBudget: BudgetCategory[] = [
  { label: "Stay", amount: 360, note: "2 nights · sample only", color: "#7971dd" },
  { label: "Food", amount: 150, note: "Meals & coffee", color: "#efa484" },
  { label: "Getting around", amount: 40, note: "Local transit", color: "#8bb6a0" },
  { label: "Experiences", amount: 70, note: "Tickets & activities", color: "#e6c46e" },
];
