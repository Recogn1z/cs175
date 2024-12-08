export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const services: Service[] = [
  {
    id: "basic",
    name: "Basic Cleaning",
    price: 80,
    description: "Standard cleaning service including dusting, vacuuming, and basic sanitization"
  },
  {
    id: "deep",
    name: "Deep Cleaning",
    price: 150,
    description: "Thorough cleaning including hard-to-reach areas, appliances, and detailed sanitization"
  },
  {
    id: "eco",
    name: "Eco-Friendly Package",
    price: 120,
    description: "Environmentally conscious cleaning using sustainable products and methods"
  },
  {
    id: "commercial",
    name: "Commercial Cleaning",
    price: 200,
    description: "Professional cleaning service for offices and commercial spaces"
  }
];