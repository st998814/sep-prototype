export interface Item {
  id: number;
  title: string;
  category: "event" | "facility" | "transport";
  description: string;
}
//typescript grammar: Item is an object with id, title, category, description, MOCK_DATA is an array of Item

export const MOCK_DATA: Item[] = [
  { id: 1, title: "City Library", category: "facility", description: "Open 9am–5pm" },
  { id: 2, title: "Tram Stop R1", category: "transport", description: "Every 10 mins" },
  { id: 3, title: "Mawson Lakes Market", category: "event", description: "Saturday 8–12" },
  { id: 4, title: "EV Charger – North Tce", category: "facility", description: "Fast charger" },
  { id: 5, title: "Community Concert", category: "event", description: "Free entry" },
  { id: 6, title: "FakeData", category: "event", description: "City Library" },
];