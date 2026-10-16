import { Animal } from './animal.model';
import { Animal_type } from './animal-type.model';
import { Staff } from './staff.model';

export interface Intake {
  id?: number;
  intake_date?: Date | string;
  intake_staff_member?: Staff;
  needs_medical?: boolean;
  TYPE?: Animal_type;
  animal?: Animal;
}
