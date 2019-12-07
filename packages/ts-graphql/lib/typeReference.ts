import * as ast from '@nger/ast.tsc'
import * as graphql from '@nger/ast.graphql';
import { CompilerContext } from './compiler';
import { TsGraphqlVisitor } from './ts-graphql';
import { createTypeNode } from './handlers/util';
export class TypeNode {
    parent: TypeNode;
    children: TypeNode[] = [];
    type: graphql.TypeNode;
    getDefaultType(type: graphql.TypeNode): graphql.NamedTypeNode | graphql.ListTypeNode | undefined {
        const { __type } = this.getListType(type);
        if (!__type) {
            return;
        }
        const typeAst = this.context.create(__type.aliasSymbol || __type.symbol)
        if (typeAst instanceof ast.TypeParameterSymbol) {
            const ast = typeAst.visit(this.visitor, this.context)
            if (ast.default) {
                const type = this.getType();
                if (type instanceof graphql.ListTypeNode) {
                    const listTypeNode = new graphql.ListTypeNode();
                    const named = new graphql.NamedTypeNode();
                    named.name = ast.default;
                    listTypeNode.type = named;
                    return listTypeNode;
                }
                if (type instanceof graphql.NamedTypeNode) {
                    type.name = ast.default;
                    return type;
                }
            }
        }
    }
    getType(type?: graphql.TypeNode | TypeNode): graphql.ListTypeNode | graphql.NamedTypeNode {
        type = type || this.type;
        if (type instanceof graphql.NonNullTypeNode) {
            return this.getType(type.type);
        } else if (type instanceof graphql.NameNode) {
            const ast = new graphql.NamedTypeNode();
            ast.name = type;
            return ast;
        } else if (type instanceof graphql.ListTypeNode) {
            if (type.type instanceof TypeNode) {
                type.type = type.type.getType();
            }
            return type;
        } else if (type instanceof TypeNode) {
            return type.getType();
        } else {
            return type;
        }
    }
    getName(type?: graphql.TypeNode | graphql.NameNode | TypeNode) {
        type = type || this.type;
        let name = ``
        if (type instanceof graphql.NonNullTypeNode) {
            name += this.getName(type.type)
        } else if (type instanceof graphql.NamedTypeNode) {
            name += type.name.value;
        } else if (type instanceof graphql.ListTypeNode) {
            name += this.getName(type.type);
        } else if (type instanceof graphql.NameNode) {
            name += type.value;
        } else {
            name += type.getName();
        }
        return name;
    }
    getTypeName(type?: graphql.TypeNode | graphql.NameNode | TypeNode): string {
        type = type || this.type;
        const childrenName = this.children.map(child => child.getTypeName()).join('')
        let name = ``
        if (type instanceof graphql.NonNullTypeNode) {
            name += this.getName(type.type) + childrenName
        } else if (type instanceof graphql.NamedTypeNode) {
            name += type.name.value + childrenName;
        } else if (type instanceof graphql.ListTypeNode) {
            name += this.getName(type.type) + childrenName;
        } else if (type instanceof graphql.NameNode) {
            name += type.value + childrenName;
        } else {
            name += type.getName() + childrenName;
        }
        return name;
    }
    getListType(type?: graphql.TypeNode | TypeNode): graphql.NameNode {
        type = type || this.type;
        if (type instanceof graphql.NonNullTypeNode) {
            return this.getListType(type.type)
        } else if (type instanceof graphql.NamedTypeNode) {
            return type.name;
        } else if (type instanceof graphql.NameNode) {
            return type;
        } else if (type instanceof TypeNode) {
            return type.getListType()
        } else if (type instanceof graphql.ListTypeNode) {
            return this.getListType(type.type)
        } else {
            debugger;
            throw `demo`
        }
    }
    constructor(private node: ast.TypeNode, private visitor: TsGraphqlVisitor, private context: CompilerContext) {
        if (node instanceof ast.KeywordTypeNode) {
            this.type = node.toJson(visitor, context)
        }
        if (node instanceof ast.ArrayTypeNode) {
            const type: TypeNode = node.elementType.visit(this.visitor, this.context)
            this.type = new graphql.ListTypeNode();
            this.type.type = type.getType();
        }
        if (node instanceof ast.TypeReferenceNode) {
            this.type = node.typeName.visit(visitor, context)
            if (node.typeArguments) {
                this.children = node.typeArguments.map(type => {
                    const child = new TypeNode(type, visitor, context);
                    child.parent = this;
                    return child;
                });
            }
        }
    }

    // create field definition node
    createFieldDefinitionNode(it: graphql.FieldDefinitionNode | graphql.InputValueDefinitionNode, isInput: boolean) {
        const { name, child, type, __index } = it;
        if (child && child.children.length > 0) {
            let inter: any;
            if (isInput) {
                inter = child.createInputObjectTypeDefinitionNode();
            } else {
                inter = child.createObjectTypeDefinitionNode();
            } if (inter instanceof graphql.ObjectTypeDefinitionNode || inter instanceof graphql.InputObjectTypeDefinitionNode) {
                this.context.setStatements([inter])
                it.type = createTypeNode(inter.name.value, child.getType())
            } else {
                it.type = child.getType();
            }
            debugger;
        }
        if (this.children) {
            const child = Reflect.get(this.children, it.__index)
            if (child) {
                let inter: any;
                if (isInput) {
                    inter = child.createInputObjectTypeDefinitionNode();
                } else {
                    inter = child.createObjectTypeDefinitionNode();
                }
                if (inter instanceof graphql.ObjectTypeDefinitionNode || inter instanceof graphql.InputObjectTypeDefinitionNode) {
                    this.context.setStatements([inter])
                    it.type = createTypeNode(inter.name.value, child.getType())
                } else {
                    it.type = child.type;
                }
            }
        } else {
            const type = this.getDefaultType(it.type)
            if (type) {
                it.type = type
            }
        }
        return it;
    }
    // create interface type
    createInterfaceTypeDefinitionNode(isInput: boolean): graphql.InterfaceTypeDefinitionNode | undefined {
        const node = this.type;
        const type = this.getListType(node);
        if (type.__type) {
            const __type = type.__type;
            const ast = this.context.create(__type.aliasSymbol || __type.symbol);
            if (ast && typeof ast.visit !== 'function') {
                if (this.children.length > 0) {
                    const res = this.children[0].createInterfaceTypeDefinitionNode(isInput);
                    return res;
                }
            }
            if (ast && typeof ast.visit === 'function') {
                const res = ast.visit(this.visitor, this.context);
                if (res instanceof graphql.InterfaceTypeDefinitionNode) {
                    res.name.value = this.getTypeName()
                }
                if (res instanceof graphql.InterfaceTypeDefinitionNode) {
                    if (Array.isArray(res.fields)) {
                        res.fields = res.fields.map(it => this.createFieldDefinitionNode(it, isInput)) as any;
                    }
                    return res;
                }
            }
        }
        return;
    }
    interfaceTypeDefinitionNodeToObjectTypeDefinitionNode(node: graphql.InterfaceTypeDefinitionNode, context: CompilerContext): graphql.ObjectTypeDefinitionNode {
        const nameValue = new graphql.NameNode(node.name.value)
        const ast = new graphql.ObjectTypeDefinitionNode();
        ast.name = nameValue;
        ast.description = node.description;
        ast.directives = node.directives;
        if (node.fields) {
            ast.fields = node.fields.map(it => this.fieldDefinitionNodeToFieldDefinitionNode(it, context)).filter(it => !!it) as any;
        }
        return ast;
    }
    interfaceTypeDefinitionNodeToInputObjectTypeDefinitionNode(node: graphql.InterfaceTypeDefinitionNode, context: CompilerContext): graphql.InputObjectTypeDefinitionNode {
        const ast = new graphql.InputObjectTypeDefinitionNode();
        const nameValue = new graphql.NameNode(node.name.value + 'Input')
        ast.name = nameValue;
        ast.description = node.description;
        ast.directives = node.directives;
        if (node.fields) {
            ast.fields = node.fields.map(it => this.fieldDefinitionNodeToInputValueDefinitionNode(it, context)).filter(it => !!it) as any;
        }
        return ast;
    }
    fieldDefinitionNodeToInputValueDefinitionNode(node: graphql.FieldDefinitionNode, context: CompilerContext): graphql.InputValueDefinitionNode | undefined {
        if (Array.isArray(node.arguments)) {
            return;
        }
        const ast = new graphql.InputValueDefinitionNode();
        ast.name = node.name;
        ast.description = node.description;
        ast.directives = node.directives;
        ast.__index = node.__index;
        // 转input
        ast.type = node.type;
        const type = node.type;
        const listType = this.getListType(type)
        if (listType && listType.__type) {
            const res = this.visitor.handlerType(listType.__type, this.visitor, context)
            if (res) {
                if (res instanceof graphql.InterfaceTypeDefinitionNode) {
                    const obj = this.interfaceTypeDefinitionNodeToInputObjectTypeDefinitionNode(res, context)
                    if (obj) {
                        context.setStatements([obj]);
                        ast.type = createTypeNode(obj.name.value, node.type)
                    }
                } else {
                    if (res.default) {
                        const { default: _def, name } = res;
                        const nameValue = (_def || name).value;
                        ast.type = createTypeNode(nameValue, node.type)
                    }
                }
            }
        }
        return ast;
    }
    fieldDefinitionNodeToFieldDefinitionNode(node: graphql.FieldDefinitionNode, context: CompilerContext): graphql.FieldDefinitionNode | undefined {
        if (Array.isArray(node.arguments)) {
            return;
        }
        const ast = new graphql.FieldDefinitionNode();
        ast.name = node.name;
        ast.description = node.description;
        ast.directives = node.directives;
        ast.__index = node.__index;
        // 转input
        ast.type = node.type;
        const type = node.type;
        const listType = this.getListType(type)
        if (listType && listType.__type) {
            const res = this.visitor.handlerType(listType.__type, this.visitor, context)
            if (res) {
                if (res instanceof graphql.InterfaceTypeDefinitionNode) {
                    const obj = this.interfaceTypeDefinitionNodeToObjectTypeDefinitionNode(res, context)
                    if (obj) {
                        context.setStatements([obj]);
                        ast.type = createTypeNode(obj.name.value, node.type)
                    }
                } else {
                    if (res.default) {
                        const { default: _def, name } = res;
                        const nameValue = (_def || name).value;
                        ast.type = createTypeNode(nameValue, node.type)
                    }
                }
            }
        }
        return ast;
    }
    createObjectTypeDefinitionNode(): graphql.ObjectTypeDefinitionNode | undefined {
        const type = this.createInterfaceTypeDefinitionNode(false);
        if (type) {
            return this.interfaceTypeDefinitionNodeToObjectTypeDefinitionNode(
                type,
                this.context
            );
        }
    }
    createInputObjectTypeDefinitionNode(): graphql.InputObjectTypeDefinitionNode | undefined {
        const type = this.createInterfaceTypeDefinitionNode(true);
        if (type) {
            return this.interfaceTypeDefinitionNodeToInputObjectTypeDefinitionNode(
                type,
                this.context
            );
        }
    }
    hasChild(name: string) {
        return this.children.some(it => it.getTypeName() === name)
    }
}