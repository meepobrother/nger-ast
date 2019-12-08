import { User } from './entities/User.entity';
import { Department } from './entities/Department.entity';
export class UserDepartment {
    user: User;
    department: Department;
}
export type IDepartmen = Department | User | UserDepartment;