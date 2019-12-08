import { Query, Resolver, ResolveProperty } from '@nestjs/graphql';
import { Department } from './entities/Department.entity'
import { User } from './entities/User.entity'
import { IDepartmen, UserDepartment } from './types';
@Resolver('IDepartmen')
export class DemoUnion {
    @ResolveProperty()
    __resolveType(obj: IDepartmen) {
        if (obj instanceof User) {
            return `User`;
        }
        if (obj instanceof Department) {
            return `Department`
        }
        if (obj instanceof UserDepartment) {
            return `UserDepartment`
        }
    }
}
@Resolver()
export class DemoGraphql {
    id: number = 0;
    /**
     * get department
     * @param {User} user 
     */
    @Query()
    async getDepartment(): Promise<IDepartmen> {
        this.id += 1;
        const department = new Department()
        department.title = `title`;
        const user = new User();
        user.password = `password`;
        user.username = `username`;
        if (this.id % 3 === 0) {
            const userDepartment = new UserDepartment();
            userDepartment.user = user;
            userDepartment.department = department;
            return userDepartment;
        }
        if (this.id % 2 === 0) {
            return department;
        }
        return user;
    }
}
