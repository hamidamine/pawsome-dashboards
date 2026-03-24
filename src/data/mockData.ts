// Demo data for when no user is authenticated
export const mockDogs = [
  { id: "demo-1", name: "Max", breed: "Golden Retriever", age: 3, size: "large" as const, weight: 30, photo_url: null, temperament: "Joueur", special_needs: null, is_neutered: true, vaccinations_up_to_date: true, owner_id: "demo", created_at: null, updated_at: null },
  { id: "demo-2", name: "Bella", breed: "Caniche", age: 5, size: "small" as const, weight: 8, photo_url: null, temperament: "Calme", special_needs: null, is_neutered: true, vaccinations_up_to_date: true, owner_id: "demo", created_at: null, updated_at: null },
];

export const mockBookings = [
  {
    id: "demo-b1", dog_id: "demo-1", owner_id: "demo", walker_id: null,
    scheduled_date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    scheduled_time: "09:00", duration_minutes: 30, status: "confirmed" as const,
    service_type: "promenade" as const, address: "Parc de la Tête d'Or, Lyon",
    notes: null, price: 15, created_at: null, updated_at: null,
    owner_confirmed: true, walker_confirmed: true, cancellation_reason: null,
    cancelled_by: null, latitude: null, longitude: null, city: "Lyon",
    dogs: { name: "Max", breed: "Golden Retriever", photo_url: null },
  },
  {
    id: "demo-b2", dog_id: "demo-2", owner_id: "demo", walker_id: null,
    scheduled_date: new Date(Date.now() + 172800000).toISOString().split("T")[0],
    scheduled_time: "14:00", duration_minutes: 45, status: "pending" as const,
    service_type: "promenade" as const, address: "Jardin du Luxembourg, Paris",
    notes: null, price: 20, created_at: null, updated_at: null,
    owner_confirmed: false, walker_confirmed: false, cancellation_reason: null,
    cancelled_by: null, latitude: null, longitude: null, city: "Paris",
    dogs: { name: "Bella", breed: "Caniche", photo_url: null },
  },
];

export const mockWalkerProfile = {
  id: "demo-wp", user_id: "demo", hourly_rate: 18, max_dogs: 4,
  experience_years: 5, rating: 4.8, total_reviews: 47, total_walks: 312,
  verified: true, services: ["promenade", "garde", "visite"] as const,
  available_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  available_hours_start: "08:00", available_hours_end: "19:00",
  service_radius_km: 10, latitude: null, longitude: null,
  created_at: null, updated_at: null,
};

export const mockProfile = {
  id: "demo", email: "demo@dogwalking.fr", first_name: "Marie",
  last_name: "Dupont", bio: "Passionnée par les animaux depuis toujours 🐾",
  avatar_url: null, city: "Lyon", address: null, phone: null,
  postal_code: null, user_type: "both" as const,
  created_at: null, updated_at: null,
};

export const mockNearbyWalkers = [
  {
    id: "w1", user_id: "w1", rating: 4.9, total_reviews: 89, hourly_rate: 15,
    verified: true, total_walks: 456, experience_years: 7, max_dogs: 3,
    services: ["promenade"] as any, available_days: null, available_hours_start: null,
    available_hours_end: null, service_radius_km: 5, latitude: null, longitude: null,
    created_at: null, updated_at: null,
    profiles: { id: "w1", first_name: "Lucas", last_name: "Martin", avatar_url: null },
  },
  {
    id: "w2", user_id: "w2", rating: 4.7, total_reviews: 34, hourly_rate: 12,
    verified: true, total_walks: 178, experience_years: 3, max_dogs: 4,
    services: ["promenade", "garde"] as any, available_days: null, available_hours_start: null,
    available_hours_end: null, service_radius_km: 8, latitude: null, longitude: null,
    created_at: null, updated_at: null,
    profiles: { id: "w2", first_name: "Sophie", last_name: "Bernard", avatar_url: null },
  },
  {
    id: "w3", user_id: "w3", rating: 4.5, total_reviews: 21, hourly_rate: 18,
    verified: false, total_walks: 95, experience_years: 2, max_dogs: 2,
    services: ["promenade"] as any, available_days: null, available_hours_start: null,
    available_hours_end: null, service_radius_km: 3, latitude: null, longitude: null,
    created_at: null, updated_at: null,
    profiles: { id: "w3", first_name: "Emma", last_name: "Petit", avatar_url: null },
  },
];

export const mockEarnings = { today: 45, week: 215, month: 890, trend: 12 };

export const mockUpcomingBookings = [
  { id: "1", dogName: "Max", date: "Lun 24 Mars", time: "09:00", duration: "30 min", status: "confirmée" as const },
  { id: "2", dogName: "Bella", date: "Mar 25 Mars", time: "14:00", duration: "45 min", status: "en_attente" as const },
  { id: "3", dogName: "Rocky", date: "Mer 26 Mars", time: "10:30", duration: "60 min", status: "confirmée" as const },
];
