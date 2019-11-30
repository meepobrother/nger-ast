import * as ast from './ast';
import { printBlockString } from './blockString';
export function print(ast: ast.ASTNode): string {
    const visitor = new PrintVisitor();
    if (ast)
        return ast.visit(visitor)
    return ``
}
export class PrintVisitor implements ast.Visitor {
    visit(node?: ast.Node, context?: any): string {
        return node ? node.visit(this, context) : ``
    }
    visits(nodes?: ast.Node[], context?: any) {
        return nodes ? nodes.map(node => this.visit(node, context)) : undefined;
    }
    visitSelectionSetNode(node: ast.SelectionSetNode) {
        const { selections } = node.toJson(this)
        return this.block(selections)
    }
    visitFieldNode(node: ast.FieldNode) {
        const { alias, name, arguments: args, directives, selectionSet } = node.toJson(this);
        return this.join(
            [
                this.wrap('', alias, ': ') + name + this.wrap('(', this.join(args, ', '), ')'),
                this.join(directives, ' '),
                selectionSet,
            ],
            ' '
        )
    }
    visitArgumentNode(node: ast.ArgumentNode) {
        const { name, value } = node.toJson(this)
        return name + ': ' + value
    }
    visitFragmentSpreadNode(node: ast.FragmentSpreadNode) {
        const { name, directives } = node.toJson(this)
        return '...' + name + this.wrap(' ', this.join(directives, ' '))
    }
    visitInlineFragmentNode(node: ast.InlineFragmentNode) {
        const { typeCondition, directives, selectionSet } = node.toJson(this)
        return this.join(
            ['...', this.wrap('on ', typeCondition), this.join(directives, ' '), selectionSet],
            ' '
        )
    }
    visitFragmentDefinitionNode(node: ast.FragmentDefinitionNode) {
        const { name,
            typeCondition,
            variableDefinitions,
            directives,
            selectionSet } = node.toJson(this)
        return `fragment ${name}${this.wrap('(', this.join(variableDefinitions, ', '), ')')} ` +
            `on ${typeCondition} ${this.wrap('', this.join(directives, ' '), ' ')}` +
            selectionSet;
    }
    visitIntValueNode(node: ast.IntValueNode) {
        return node.value;
    }
    visitFloatValueNode(node: ast.FloatValueNode) {
        return node.value;
    }
    visitStringValueNode(node: ast.StringValueNode, key: string) {
        const { value, block: isBlockString } = node;
        return isBlockString
            ? printBlockString(value, key === 'description' ? '' : '  ')
            : JSON.stringify(value)
    }
    visitBooleanValueNode(node: ast.BooleanValueNode) {
        return node.value ? 'true' : 'false'
    }
    visitNullValueNode(node: ast.NullValueNode) {
        return 'null'
    }
    visitEnumValueNode(node: ast.EnumValueNode) {
        return node.value;
    }
    visitListValueNode(node: ast.ListValueNode) {
        const { values } = node.toJson(this)
        return '[' + this.join(values, ', ') + ']'
    }
    visitObjectValueNode(node: ast.ObjectValueNode) {
        const { fields } = node.toJson(this)
        return '{' + this.join(fields, ', ') + '}'
    }
    visitObjectFieldNode(node: ast.ObjectFieldNode) {
        const { name, value } = node.toJson(this)
        return name + ': ' + value
    }
    visitDirectiveNode(node: ast.DirectiveNode) {
        const { name, arguments: args } = node.toJson(this)
        return '@' + name + this.wrap('(', this.join(args, ', '), ')')
    }
    visitNamedTypeNode(node: ast.NamedTypeNode) {
        const { name } = node.toJson(this);
        return name;
    }
    visitListTypeNode(node: ast.ListTypeNode) {
        const { type } = node.toJson(this)
        return '[' + type + ']'
    }
    visitNonNullTypeNode(node: ast.NonNullTypeNode) {
        const { type } = node.toJson(this);
        return type + '!'
    }
    visitSchemaDefinitionNode(node: ast.SchemaDefinitionNode) {
        const { directives, operationTypes } = node.toJson(this)
        return this.join(['schema', this.join(directives, ' '), this.block(operationTypes)], ' ')
    }
    visitOperationTypeDefinitionNode(node: ast.OperationTypeDefinitionNode) {
        const { operation, type } = node.toJson(this)
        return operation + ': ' + type;
    }
    visitScalarTypeDefinitionNode(node: ast.ScalarTypeDefinitionNode) {
        const { description, name, directives } = node.toJson(this)
        return this.addDescription(description, this.join(['scalar', name, this.join(directives, ' ')], ' '))
    }
    visitObjectTypeDefinitionNode(node: ast.ObjectTypeDefinitionNode) {
        const { description, name, interfaces, directives, fields } = node.toJson(this)
        return this.addDescription(description, this.join(
            [
                'type',
                name,
                this.wrap('implements ', this.join(interfaces, ' & ')),
                this.join(directives, ' '),
                this.block(fields),
            ],
            ' '
        ));
    }
    visitFieldDefinitionNode(node: ast.FieldDefinitionNode) {
        const { description, name, arguments: args, type, directives } = node.toJson(this)
        return this.addDescription(description, name +
            (this.hasMultilineItems(args)
                ? this.wrap('(\n', this.indent(this.join(args, '\n')), '\n)')
                : this.wrap('(', this.join(args, ', '), ')')) +
            ': ' +
            type +
            this.wrap(' ', this.join(directives, ' '))
        )
    }
    visitInputValueDefinitionNode(node: ast.InputValueDefinitionNode) {
        const { description, name, type, defaultValue, directives } = node.toJson(this);
        return this.addDescription(description, this.join(
            [name + ': ' + type, this.wrap('= ', defaultValue), this.join(directives, ' ')],
            ' ',
        ));
    }
    visitInterfaceTypeDefinitionNode(node: ast.InterfaceTypeDefinitionNode) {
        const { description, name, interfaces, directives, fields } = node.toJson(this)
        return this.addDescription(description, this.join(
            [
                'interface',
                name,
                this.wrap('implements ', this.join(interfaces, ' & ')),
                this.join(directives, ' '),
                this.block(fields),
            ],
            ' '
        ))
    }
    visitUnionTypeDefinitionNode(node: ast.UnionTypeDefinitionNode) {
        const { description, name, directives, types } = node.toJson(this)
        return this.addDescription(description, this.join(
            [
                'union',
                name,
                this.join(directives, ' '),
                types && types.length !== 0 ? '= ' + this.join(types, ' | ') : '',
            ],
            ' '
        ))
    }
    visitEnumTypeDefinitionNode(node: ast.EnumTypeDefinitionNode) {
        const { description, name, directives, values } = node.toJson(this)
        return this.addDescription(description, this.join(['enum', name, this.join(directives, ' '), this.block(values)], ' '))
    }
    visitEnumValueDefinitionNode(node: ast.EnumValueDefinitionNode) {
        const { description, name, directives } = node.toJson(this);
        this.addDescription(description, this.join([name, this.join(directives, ' ')], ' '))
    }
    visitInputObjectTypeDefinitionNode(node: ast.InputObjectTypeDefinitionNode) {
        const { description, name, directives, fields } = node.toJson(this);
        return this.addDescription(description, this.join(['input', name, this.join(directives, ' '), this.block(fields)], ' '))
    }
    visitDirectiveDefinitionNode(node: ast.DirectiveDefinitionNode) {
        const { description, name, arguments: args, repeatable, locations } = node.toJson(this)
        return this.addDescription(description, 'directive @' +
            name +
            (this.hasMultilineItems(args)
                ? this.wrap('(\n', this.indent(this.join(args, '\n')), '\n)')
                : this.wrap('(', this.join(args, ', '), ')')) +
            (repeatable ? ' repeatable' : '') +
            ' on ' +
            this.join(locations, ' | '))
    }
    visitSchemaExtensionNode(node: ast.SchemaExtensionNode) {
        const { directives, operationTypes } = node.toJson(this)
        return this.join(['extend schema', this.join(directives, ' '), this.block(operationTypes)], ' ')
    }
    visitScalarTypeExtensionNode(node: ast.ScalarTypeExtensionNode) {
        const { name, directives } = node.toJson(this)
        return this.join(['extend scalar', name, this.join(directives, ' ')], ' ')
    }
    visitObjectTypeExtensionNode(node: ast.ObjectTypeExtensionNode) {
        const { name, interfaces, directives, fields } = node.toJson(this)
        return this.join(
            [
                'extend type',
                name,
                this.wrap('implements ', this.join(interfaces, ' & ')),
                this.join(directives, ' '),
                this.block(fields),
            ],
            ' '
        )
    }
    visitInterfaceTypeExtensionNode(node: ast.InterfaceTypeExtensionNode) {
        const { name, interfaces, directives, fields } = node.toJson(this)
        return this.join(
            [
                'extend interface',
                name,
                this.wrap('implements ', this.join(interfaces, ' & ')),
                this.join(directives, ' '),
                this.block(fields),
            ],
            ' '
        )
    }
    visitUnionTypeExtensionNode(node: ast.UnionTypeExtensionNode) {
        const { name, directives, types } = node.toJson(this);
        return this.join(
            [
                'extend union',
                name,
                this.join(directives, ' '),
                types && types.length !== 0 ? '= ' + this.join(types, ' | ') : '',
            ],
            ' '
        )
    }
    visitEnumTypeExtensionNode(node: ast.EnumTypeExtensionNode) {
        const { name, directives, values } = node.toJson(this)
        return this.join(['extend enum', name, this.join(directives, ' '), this.block(values)], ' ')
    }
    visitInputObjectTypeExtensionNode(node: ast.InputObjectTypeExtensionNode) {
        const { name, directives, fields } = node.toJson(this)
        return this.join(['extend input', name, this.join(directives, ' '), this.block(fields)], ' ')
    }
    visitNameNode(node: ast.NameNode): string {
        return node.value;
    }
    visitDocumentNode(node: ast.DocumentNode): string {
        return this.join(node.definitions, '\n\n') + '\n'
    }
    visitOperationDefinitionNode(node: ast.OperationDefinitionNode): string {
        const { operation: op, name, directives: _directives, variableDefinitions: _variableDefinitions, selectionSet: _selectionSet } = node.toJson(this);
        const varDefs = this.wrap('(', this.join(_variableDefinitions, ', '), ')');
        const directives = this.join(_directives, ' ');
        const selectionSet = this.visit(_selectionSet);
        if (name && directives && varDefs && op === 'query') {
            return selectionSet;
        }
        return this.join([op, this.join([name, varDefs]), directives, selectionSet], ' ')
    }
    visitVariableDefinitionNode(node: ast.VariableDefinitionNode): string {
        const { variable, type, defaultValue, directives } = node.toJson(this)
        return variable +
            ': ' +
            type +
            this.wrap(' = ', defaultValue) +
            this.wrap(' ', this.join(directives, ' '))
    }
    visitVariableNode(node: ast.VariableNode): string {
        const { name } = node.toJson(this)
        return `$${name}`
    }
    private wrap(start: string, maybeString?: ast.Node | string, end: string = ''): string {
        if (maybeString) {
            if (typeof maybeString === 'string') {
                return `${start}${maybeString}${end}`
            }
            return `${start}${maybeString.visit(this)}${end}`
        }
        return ``;
    }
    private join(maybeArray?: (ast.Node | string | undefined)[], separator: string = ``): string {
        return maybeArray ? maybeArray.filter(it => !!it).map(it => {
            if (typeof it === 'string') {
                return it;
            }
            return this.visit(it);
        }).join(separator) : ""
    }
    private block(array?: ast.Node[]): string {
        if (array && array.length !== 0) {
            return '{\n' + this.indent(this.join(array, '\n')) + '\n}'
        }
        return ``;
    }
    private indent(maybeString?: string): string {
        if (maybeString) {
            return `  ${maybeString.replace(/\n/g, '\n  ')}`
        }
        return ``
    }
    private isMultiline(string: string): boolean {
        return string.indexOf('\n') !== -1;
    }
    private hasMultilineItems(maybeArray: string[]) {
        return maybeArray && maybeArray.some((it) => this.isMultiline(it));
    }
    private addDescription(description: ast.StringValueNode, node: any) {
        return this.join([description, node], '\n');
    }
}
