export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Host extends CosmicObject {
  type: 'hosts';
  metadata: {
    name?: string;
    bio?: string;
    profile_photo?: CosmicImage;
    email?: string;
  };
}

export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
  };
}

export interface Pool extends CosmicObject {
  type: 'pools';
  metadata: {
    description?: string;
    location?: string;
    price_per_hour?: number;
    max_guests?: number;
    amenities?: string;
    featured_image?: CosmicImage;
    gallery?: CosmicImage[];
    host?: Host;
    category?: Category;
  };
}

export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    pool?: Pool;
    reviewer_name?: string;
    rating?: number;
    comment?: string;
    date?: string;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}