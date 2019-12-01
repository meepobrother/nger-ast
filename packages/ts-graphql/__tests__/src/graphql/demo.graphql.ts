import { Query } from '@nestjs/graphql';
import { Controller } from '@nestjs/common';

@Controller()
export class DemoGraphql {
    @Query()
    async getDemo() {
        return `string`
    }
}