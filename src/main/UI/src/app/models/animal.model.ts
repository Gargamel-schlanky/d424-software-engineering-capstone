import { Intake } from './intake.model';

export interface Animal {
  id?: number;
  name?: string;
  age?: string;
  description?: string;
  medical_id?: number;
  adoptable?: boolean;
  current_resident?: boolean;
  photoUrl?: string;
  intakes?: Intake[];
}
