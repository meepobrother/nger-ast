import { CompilerContext } from "./compiler";
export class NamingStrage {
    createUnionName(name: string, context: CompilerContext) {
        name = name.trim();
        const names = name.split('|').map(it => it.trim()).filter(it => it !== 'undefined')
        if (names.length === 1) {
            return this.handlerName(names[0]);
        } else {
            const isString = name.startsWith(`"`);
            if (isString) return this.handlerName('string');
            return name.split(',')[0];
        }
    }
    create(name: string | undefined, context: CompilerContext): string {
        let targetName: string = name || ``
        const reg = /(.*?)\<(.*)\>/;
        const exec = reg.exec(targetName);
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
        if (targetName.includes('[')) {
            return this.create(targetName.replace('[', ''), context);
        }
        if (targetName.includes(']')) {
            return this.create(targetName.replace(']', ''), context);
        }
        if (targetName.includes('&')) {
            return targetName.split('&').map(it => it.trim()).join('And')
        }
        return targetName;
    }
    handlerName(val: string) {
        switch (val) {
            case 'Int':
            case 'number':
                return 'Int';
            case 'String':
            case 'string':
                return 'String';
            case 'Float':
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
