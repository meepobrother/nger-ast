import { CompilerContext } from "./compiler";
export class NamingStrage {
    createUnionName(name: string, context: CompilerContext) {
        name = name.trim();
        const names = name.split('|')
        if (names.length === 1) {
            return names[0]
        } else {
            const isString = name.startsWith(`"`)
            if (isString) return this.handlerName('string');
            return name.split(',')[0]
        }
    }
    create(name: string | undefined, context: CompilerContext): string {
        let targetName: string = name || ``
        const reg = /(.*?)\<(.*)\>/;
        const exec = reg.exec(targetName)
        if (exec) {
            switch (exec.length) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    const [all, order, user] = exec;
                    switch (order) {
                        case 'Promise':
                            return `${this.create(user, context)}`
                        default:
                            return `${this.create(user, context)}${order}`
                    }
                default:
                    break;
            }
        }
        targetName = this.createUnionName(targetName, context)
        return targetName;
    }
    handlerName(val: string) {
        switch (val) {
            case 'Int':
            case 'Int32':
            case 'Int64':
            case 'Uint32':
            case 'Sint32':
            case 'Uint64':
            case 'Int64':
            case 'Sint64':
            case 'number':
                return 'Int';
            case 'String':
            case 'string':
                return 'String';
            case 'Double':
            case 'Float':
            case 'Fixed32':
            case 'Sfixed32':
            case 'Fixed64':
            case 'Sfixed64':
                return 'Float';
            case 'Bool':
            case 'Boolean':
            case 'boolean':
                return 'Boolean';
            case 'Id':
                return 'Id';
            default:
                return val;
        }
    }
}
