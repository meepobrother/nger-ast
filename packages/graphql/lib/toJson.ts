import * as ast from './ast';
import { moduleRef } from './module';
export function toJson(ast: ast.ASTNode): string {
    return moduleRef.toJson(ast as any);
}
