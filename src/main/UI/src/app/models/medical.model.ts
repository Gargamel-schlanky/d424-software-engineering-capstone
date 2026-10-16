export interface Medical {
  id?: number;
  vet?: string;
  notes?: string;
  has_restrictions?: boolean;
  last_apt?: Date | string;
  next_apt?: Date | string;
}
