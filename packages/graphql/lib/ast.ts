import { Source } from './source';
import { TokenKindEnum } from './tokenKind';
import { Plain, PlainPro } from '@nger/plain';
export class Token {
    kind: TokenKindEnum;
    start: number;
    end: number;
    line: number;
    column: number;
    value: string | undefined;
    prev: Token | null;
    next: Token | null;
    constructor(
        kind: TokenKindEnum,
        start: number,
        end: number,
        line: number,
        column: number,
        prev: Token | null,
        value?: string,
    ) {
        this.kind = kind;
        this.start = start;
        this.end = end;
        this.line = line;
        this.column = column;
        this.value = value;
        this.prev = prev;
        this.next = null;
    }
}
export class Location {
    start: number;
    end: number;
    startToken: Token;
    endToken: Token;
    source: Source;
    constructor(startToken: Token, endToken: Token, source: Source) {
        this.start = startToken.start;
        this.end = endToken.end;
        this.startToken = startToken;
        this.endToken = endToken;
        this.source = source;
    }
}
export type ASTNode =
    | NameNode
    | DocumentNode
    | OperationDefinitionNode
    | VariableDefinitionNode
    | VariableNode
    | SelectionSetNode
    | FieldNode
    | ArgumentNode
    | FragmentSpreadNode
    | InlineFragmentNode
    | FragmentDefinitionNode
    | IntValueNode
    | FloatValueNode
    | StringValueNode
    | BooleanValueNode
    | NullValueNode
    | EnumValueNode
    | ListValueNode
    | ObjectValueNode
    | ObjectFieldNode
    | DirectiveNode
    | NamedTypeNode
    | ListTypeNode
    | NonNullTypeNode
    | SchemaDefinitionNode
    | OperationTypeDefinitionNode
    | ScalarTypeDefinitionNode
    | ObjectTypeDefinitionNode
    | FieldDefinitionNode
    | InputValueDefinitionNode
    | InterfaceTypeDefinitionNode
    | UnionTypeDefinitionNode
    | EnumTypeDefinitionNode
    | EnumValueDefinitionNode
    | InputObjectTypeDefinitionNode
    | DirectiveDefinitionNode
    | SchemaExtensionNode
    | ScalarTypeExtensionNode
    | ObjectTypeExtensionNode
    | InterfaceTypeExtensionNode
    | UnionTypeExtensionNode
    | EnumTypeExtensionNode
    | InputObjectTypeExtensionNode;

export interface ASTKindToNode {
    Name: NameNode;
    Document: DocumentNode;
    OperationDefinition: OperationDefinitionNode;
    VariableDefinition: VariableDefinitionNode;
    Variable: VariableNode;
    SelectionSet: SelectionSetNode;
    Field: FieldNode;
    Argument: ArgumentNode;
    FragmentSpread: FragmentSpreadNode;
    InlineFragment: InlineFragmentNode;
    FragmentDefinition: FragmentDefinitionNode;
    IntValue: IntValueNode;
    FloatValue: FloatValueNode;
    StringValue: StringValueNode;
    BooleanValue: BooleanValueNode;
    NullValue: NullValueNode;
    EnumValue: EnumValueNode;
    ListValue: ListValueNode;
    ObjectValue: ObjectValueNode;
    ObjectField: ObjectFieldNode;
    Directive: DirectiveNode;
    NamedType: NamedTypeNode;
    ListType: ListTypeNode;
    NonNullType: NonNullTypeNode;
    SchemaDefinition: SchemaDefinitionNode;
    OperationTypeDefinition: OperationTypeDefinitionNode;
    ScalarTypeDefinition: ScalarTypeDefinitionNode;
    ObjectTypeDefinition: ObjectTypeDefinitionNode;
    FieldDefinition: FieldDefinitionNode;
    InputValueDefinition: InputValueDefinitionNode;
    InterfaceTypeDefinition: InterfaceTypeDefinitionNode;
    UnionTypeDefinition: UnionTypeDefinitionNode;
    EnumTypeDefinition: EnumTypeDefinitionNode;
    EnumValueDefinition: EnumValueDefinitionNode;
    InputObjectTypeDefinition: InputObjectTypeDefinitionNode;
    DirectiveDefinition: DirectiveDefinitionNode;
    SchemaExtension: SchemaExtensionNode;
    ScalarTypeExtension: ScalarTypeExtensionNode;
    ObjectTypeExtension: ObjectTypeExtensionNode;
    InterfaceTypeExtension: InterfaceTypeExtensionNode;
    UnionTypeExtension: UnionTypeExtensionNode;
    EnumTypeExtension: EnumTypeExtensionNode;
    InputObjectTypeExtension: InputObjectTypeExtensionNode;
}
export abstract class Node {
    description?: StringValueNode;
    abstract visit(visitor: Visitor, context?: any): any;
    abstract toJson(visitor: Visitor, context?: any): any;
}
@Plain({
    desc: `Name`
})
export class NameNode extends Node {
    @PlainPro()
    kind: 'Name';
    @PlainPro()
    loc?: Location;
    @PlainPro()
    value: string;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitNameNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            value: this.value
        }
    }
}
@Plain({
    desc: `Document`
})
export class DocumentNode extends Node {
    @PlainPro()
    kind: 'Document';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    definitions: DefinitionNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitDocumentNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            definitions: this.definitions.map(it => visitor.visit(it, context))
        }
    }
}
export type DefinitionNode =
    | ExecutableDefinitionNode
    | TypeSystemDefinitionNode
    | TypeSystemExtensionNode;
export type ExecutableDefinitionNode =
    | OperationDefinitionNode
    | FragmentDefinitionNode;
@Plain({
    desc: `SelectionSet`
})
export class SelectionSetNode extends Node {
    @PlainPro()
    kind: 'SelectionSet';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    selections: SelectionNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitSelectionSetNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            selections: visitor.visits(this.selections, context)
        }
    }
}
@Plain({
    desc: `OperationDefinition`
})
export class OperationDefinitionNode extends Node {
    @PlainPro()
    kind: 'OperationDefinition';
    @PlainPro()
    loc?: Location;
    @PlainPro()
    operation: OperationTypeNode;
    @PlainPro({
        isClass: true
    })
    name?: NameNode;
    @PlainPro({
        isClass: true
    })
    variableDefinitions?: VariableDefinitionNode[];
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    @PlainPro({
        isClass: true
    })
    selectionSet: SelectionSetNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitOperationDefinitionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            operation: this.operation,
            name: visitor.visit(this.name, context),
            variableDefinitions: visitor.visits(this.variableDefinitions, context),
            directives: visitor.visits(this.directives, context),
            selectionSet: visitor.visit(this.selectionSet, context)
        }
    }
}
export type OperationTypeNode = 'query' | 'mutation' | 'subscription';
@Plain({
    desc: `Variable`
})
export class VariableNode extends Node {
    @PlainPro()
    kind: 'Variable';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitVariableNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            name: visitor.visit(this.name, context)
        }
    }
}
@Plain({
    desc: `VariableDefinition`
})
export class VariableDefinitionNode extends Node {
    @PlainPro()
    kind: 'VariableDefinition';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    variable: VariableNode;
    @PlainPro({
        isClass: true
    })
    type: TypeNode;
    @PlainPro({
        isClass: true
    })
    defaultValue?: ValueNode;
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    visit(visitor: Visitor, context?: any): any {
        return visitor.visitVariableDefinitionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            variable: visitor.visit(this.variable, context),
            type: visitor.visit(this.type, context),
            defaultValue: visitor.visit(this.defaultValue, context),
            directives: visitor.visits(this.directives, context)
        }
    }
}


export type SelectionNode = FieldNode | FragmentSpreadNode | InlineFragmentNode;
@Plain({
    desc: `Field`
})
export class FieldNode extends Node {
    @PlainPro()
    kind: 'Field';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    alias?: NameNode;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    arguments?: ArgumentNode[];
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    @PlainPro({
        isClass: true
    })
    selectionSet?: SelectionSetNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitFieldNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            alias: visitor.visit(this.alias, context),
            name: visitor.visit(this.name, context),
            arguments: visitor.visits(this.arguments, context),
            directives: visitor.visits(this.directives, context),
            selectionSet: visitor.visit(this.selectionSet, context)
        }
    }
}
@Plain({
    desc: `Argument`
})
export class ArgumentNode extends Node {
    @PlainPro()
    kind: 'Argument';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    value: ValueNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitArgumentNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            name: visitor.visit(this.name, context),
            value: visitor.visit(this.value, context)
        }
    }
}
@Plain({
    desc: `FragmentSpread`
})
export class FragmentSpreadNode extends Node {
    @PlainPro()
    kind: 'FragmentSpread';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitFragmentSpreadNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            name: visitor.visit(this.name, context),
            directives: visitor.visits(this.directives, context)
        }
    }
}
@Plain({
    desc: `NamedType`
})
export class NamedTypeNode extends Node {
    @PlainPro()
    kind: 'NamedType';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitNamedTypeNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            name: visitor.visit(this.name, context),
        }
    }
}
@Plain({
    desc: `InlineFragment`
})
export class InlineFragmentNode extends Node {
    @PlainPro()
    kind: 'InlineFragment';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    typeCondition?: NamedTypeNode;
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    @PlainPro({
        isClass: true
    })
    selectionSet: SelectionSetNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitInlineFragmentNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            typeCondition: visitor.visit(this.typeCondition, context),
            directives: visitor.visits(this.directives, context),
            selectionSet: visitor.visit(this.selectionSet, context)
        }
    }
}
@Plain({
    desc: `FragmentDefinition`
})
export class FragmentDefinitionNode extends Node {
    @PlainPro()
    kind: 'FragmentDefinition';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    variableDefinitions?: VariableDefinitionNode[];
    @PlainPro({
        isClass: true
    })
    typeCondition: NamedTypeNode;
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    @PlainPro({
        isClass: true
    })
    selectionSet: SelectionSetNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitFragmentDefinitionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            name: visitor.visit(this.name, context),
            variableDefinitions: visitor.visits(this.variableDefinitions, context),
            typeCondition: visitor.visit(this.typeCondition, context),
            directives: visitor.visits(this.directives, context),
            selectionSet: visitor.visit(this.selectionSet, context)
        }
    }
}
export type ValueNode =
    | VariableNode
    | IntValueNode
    | FloatValueNode
    | StringValueNode
    | BooleanValueNode
    | NullValueNode
    | EnumValueNode
    | ListValueNode
    | ObjectValueNode;
@Plain({
    desc: `IntValue`
})
export class IntValueNode extends Node {
    @PlainPro()
    kind: 'IntValue';
    @PlainPro()
    loc?: Location;
    @PlainPro()
    value: string;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitIntValueNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            value: this.value
        }
    }
}
@Plain({
    desc: `FloatValue`
})
export class FloatValueNode extends Node {
    @PlainPro()
    kind: 'FloatValue';
    @PlainPro()
    loc?: Location;
    @PlainPro()
    value: string;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitFloatValueNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            value: this.value
        }
    }
}
@Plain({
    desc: `StringValue`
})
export class StringValueNode extends Node {
    @PlainPro()
    kind: 'StringValue';
    @PlainPro()
    loc?: Location;
    @PlainPro()
    value: string;
    @PlainPro()
    block?: boolean;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitStringValueNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            value: this.value,
            block: this.block
        }
    }
}
@Plain({
    desc: `BooleanValue`
})
export class BooleanValueNode extends Node {
    @PlainPro()
    kind: 'BooleanValue';
    @PlainPro()
    loc?: Location;
    @PlainPro()
    value: boolean;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitBooleanValueNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            value: this.value
        }
    }
}
@Plain({
    desc: `NullValue`
})
export class NullValueNode extends Node {
    @PlainPro()
    kind: 'NullValue';
    @PlainPro()
    loc?: Location;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitNullValueNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc
        }
    }
}
@Plain({
    desc: `EnumValue`
})
export class EnumValueNode extends Node {
    @PlainPro()
    kind: 'EnumValue';
    @PlainPro()
    loc?: Location;
    @PlainPro()
    value: string;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitEnumValueNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            value: this.value
        }
    }
}
@Plain({
    desc: `ListValue`
})
export class ListValueNode extends Node {
    @PlainPro()
    kind: 'ListValue';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    values: ValueNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitListValueNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            values: visitor.visits(this.values, context)
        }
    }
}
@Plain({
    desc: `ObjectValue`
})
export class ObjectValueNode extends Node {
    @PlainPro()
    kind: 'ObjectValue';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    fields: ObjectFieldNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitObjectValueNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            fields: visitor.visits(this.fields, context)
        }
    }
}
@Plain({
    desc: `ObjectField`
})
export class ObjectFieldNode extends Node {
    @PlainPro()
    kind: 'ObjectField';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    value: ValueNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitObjectFieldNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            name: visitor.visit(this.name, context),
            value: visitor.visit(this.value, context)
        }
    }
}
@Plain({
    desc: `Directive`
})
export class DirectiveNode extends Node {
    @PlainPro()
    kind: 'Directive';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    arguments?: ArgumentNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitDirectiveNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            name: visitor.visit(this.name, context),
            arguments: visitor.visits(this.arguments, context)
        }
    }
}
export type TypeNode = NamedTypeNode | ListTypeNode | NonNullTypeNode;

@Plain({
    desc: `ListType`
})
export class ListTypeNode extends Node {
    @PlainPro()
    kind: 'ListType';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    type: TypeNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitListTypeNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            type: visitor.visit(this.type, context),
        }
    }
}
@Plain({
    desc: `NonNullType`
})
export class NonNullTypeNode extends Node {
    @PlainPro()
    kind: 'NonNullType';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    type: NamedTypeNode | ListTypeNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitNonNullTypeNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            type: visitor.visit(this.type, context),
        }
    }
}
export type TypeSystemDefinitionNode =
    | SchemaDefinitionNode
    | TypeDefinitionNode
    | DirectiveDefinitionNode;
@Plain({
    desc: `SchemaDefinition`
})
export class SchemaDefinitionNode extends Node {
    @PlainPro()
    kind: 'SchemaDefinition';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    @PlainPro({
        isClass: true
    })
    operationTypes: OperationTypeDefinitionNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitSchemaDefinitionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            directives: visitor.visits(this.directives, context),
            operationTypes: visitor.visits(this.operationTypes, context)
        }
    }
}
@Plain({
    desc: `OperationTypeDefinition`
})
export class OperationTypeDefinitionNode extends Node {
    @PlainPro()
    kind: 'OperationTypeDefinition';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    operation: OperationTypeNode;
    @PlainPro({
        isClass: true
    })
    type: NamedTypeNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitOperationTypeDefinitionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            operation: this.operation,
            type: visitor.visit(this.type, context)
        }
    }
}
export type TypeDefinitionNode =
    | ScalarTypeDefinitionNode
    | ObjectTypeDefinitionNode
    | InterfaceTypeDefinitionNode
    | UnionTypeDefinitionNode
    | EnumTypeDefinitionNode
    | InputObjectTypeDefinitionNode;
@Plain({
    desc: `ScalarTypeDefinition`
})
export class ScalarTypeDefinitionNode extends Node {
    @PlainPro()
    kind: 'ScalarTypeDefinition';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    description?: StringValueNode;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitScalarTypeDefinitionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            description: visitor.visit(this.description, `description`),
            name: visitor.visit(this.name, context),
            directives: visitor.visits(this.directives, context)
        }
    }
}
@Plain({
    desc: `ObjectTypeDefinition`
})
export class ObjectTypeDefinitionNode extends Node {
    @PlainPro()
    kind: 'ObjectTypeDefinition';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    description?: StringValueNode;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    interfaces?: NamedTypeNode[];
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    @PlainPro({
        isClass: true
    })
    fields?: FieldDefinitionNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitObjectTypeDefinitionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            description: visitor.visit(this.description, `description`),
            name: visitor.visit(this.name, context),
            directives: visitor.visits(this.directives, context),
            interfaces: visitor.visits(this.interfaces, context),
            fields: visitor.visits(this.fields, context)
        }
    }
}
@Plain({
    desc: `FieldDefinition`
})
export class FieldDefinitionNode extends Node {
    @PlainPro()
    kind: 'FieldDefinition';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    description?: StringValueNode;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    arguments?: InputValueDefinitionNode[];
    @PlainPro({
        isClass: true
    })
    type: TypeNode;
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitFieldDefinitionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            description: visitor.visit(this.description, `description`),
            name: visitor.visit(this.name, context),
            directives: visitor.visits(this.directives, context),
            arguments: visitor.visits(this.arguments, context),
            type: visitor.visit(this.type, context)
        }
    }
}
@Plain({
    desc: `InputValueDefinition`
})
export class InputValueDefinitionNode extends Node {
    @PlainPro()
    kind: 'InputValueDefinition';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    description?: StringValueNode;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    type: TypeNode;
    @PlainPro({
        isClass: true
    })
    defaultValue?: ValueNode;
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitInputValueDefinitionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            description: visitor.visit(this.description, `description`),
            name: visitor.visit(this.name, context),
            type: visitor.visit(this.type, context),
            directives: visitor.visits(this.directives, context),
            defaultValue: visitor.visit(this.defaultValue, context),
        }
    }
}
@Plain({
    desc: `InterfaceTypeDefinition`
})
export class InterfaceTypeDefinitionNode extends Node {
    @PlainPro()
    kind: 'InterfaceTypeDefinition';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    description?: StringValueNode;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    interfaces?: NamedTypeNode[];
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    @PlainPro({
        isClass: true
    })
    fields?: FieldDefinitionNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitInterfaceTypeDefinitionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            description: visitor.visit(this.description, `description`),
            name: visitor.visit(this.name, context),
            interfaces: visitor.visits(this.interfaces, context),
            directives: visitor.visits(this.directives, context),
            fields: visitor.visits(this.fields, context),
        }
    }
}
@Plain({
    desc: `UnionTypeDefinition`
})
export class UnionTypeDefinitionNode extends Node {
    @PlainPro()
    kind: 'UnionTypeDefinition';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    description?: StringValueNode;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    @PlainPro({
        isClass: true
    })
    types?: NamedTypeNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitUnionTypeDefinitionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            description: visitor.visit(this.description, `description`),
            name: visitor.visit(this.name, context),
            directives: visitor.visits(this.directives, context),
            types: visitor.visits(this.types, context),
        }
    }
}
@Plain({
    desc: `EnumTypeDefinition`
})
export class EnumTypeDefinitionNode extends Node {
    @PlainPro()
    kind: 'EnumTypeDefinition';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    description?: StringValueNode;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    @PlainPro({
        isClass: true
    })
    values?: EnumValueDefinitionNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitEnumTypeDefinitionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            description: visitor.visit(this.description, `description`),
            name: visitor.visit(this.name, context),
            directives: visitor.visits(this.directives, context),
            values: visitor.visits(this.values, context),
        }
    }
}
@Plain({
    desc: `EnumValueDefinition`
})
export class EnumValueDefinitionNode extends Node {
    @PlainPro()
    kind: 'EnumValueDefinition';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    description?: StringValueNode;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitEnumValueDefinitionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            description: visitor.visit(this.description, `description`),
            name: visitor.visit(this.name, context),
            directives: visitor.visits(this.directives, context),
        }
    }
}
@Plain({
    desc: `InputObjectTypeDefinition`
})
export class InputObjectTypeDefinitionNode extends Node {
    @PlainPro()
    kind: 'InputObjectTypeDefinition';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    description?: StringValueNode;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    @PlainPro({
        isClass: true
    })
    fields?: InputValueDefinitionNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitInputObjectTypeDefinitionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            description: visitor.visit(this.description, `description`),
            name: visitor.visit(this.name, context),
            directives: visitor.visits(this.directives, context),
            fields: visitor.visits(this.fields, context)
        }
    }
}
@Plain({
    desc: `DirectiveDefinition`
})
export class DirectiveDefinitionNode extends Node {
    @PlainPro()
    kind: 'DirectiveDefinition';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    description?: StringValueNode;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    arguments?: InputValueDefinitionNode[];
    @PlainPro()
    repeatable: boolean;
    @PlainPro({
        isClass: true
    })
    locations: NameNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitDirectiveDefinitionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            description: visitor.visit(this.description, `description`),
            name: visitor.visit(this.name, context),
            arguments: visitor.visits(this.arguments, context),
            repeatable: this.repeatable,
            locations: visitor.visits(this.locations, context)
        }
    }
}
export type TypeSystemExtensionNode = SchemaExtensionNode | TypeExtensionNode;
@Plain({
    desc: `SchemaExtension`
})
export class SchemaExtensionNode extends Node {
    @PlainPro()
    kind: 'SchemaExtension';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    @PlainPro({
        isClass: true
    })
    operationTypes?: OperationTypeDefinitionNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitSchemaExtensionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            directives: visitor.visits(this.directives, context),
            operationTypes: visitor.visits(this.operationTypes, context),
        }
    }
};
export type TypeExtensionNode =
    | ScalarTypeExtensionNode
    | ObjectTypeExtensionNode
    | InterfaceTypeExtensionNode
    | UnionTypeExtensionNode
    | EnumTypeExtensionNode
    | InputObjectTypeExtensionNode;
@Plain({
    desc: `ScalarTypeExtension`
})
export class ScalarTypeExtensionNode extends Node {
    @PlainPro()
    kind: 'ScalarTypeExtension';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitScalarTypeExtensionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            name: visitor.visit(this.name, context),
            directives: visitor.visits(this.directives, context),
        }
    }
}
@Plain({
    desc: `ObjectTypeExtension`
})
export class ObjectTypeExtensionNode extends Node {
    @PlainPro()
    kind: 'ObjectTypeExtension';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    interfaces?: NamedTypeNode[];
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    @PlainPro({
        isClass: true
    })
    fields?: FieldDefinitionNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitObjectTypeExtensionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            name: visitor.visit(this.name, context),
            directives: visitor.visits(this.directives, context),
            interfaces: visitor.visits(this.interfaces, context),
            fields: visitor.visits(this.fields, context),
        }
    }
}
@Plain({
    desc: `InterfaceTypeExtension`
})
export class InterfaceTypeExtensionNode extends Node {
    @PlainPro()
    kind: 'InterfaceTypeExtension';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    interfaces?: NamedTypeNode[];
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    @PlainPro({
        isClass: true
    })
    fields?: FieldDefinitionNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitInterfaceTypeExtensionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            name: visitor.visit(this.name, context),
            directives: visitor.visits(this.directives, context),
            interfaces: visitor.visits(this.interfaces, context),
            fields: visitor.visits(this.fields, context),
        }
    }
}
@Plain({
    desc: `UnionTypeExtension`
})
export class UnionTypeExtensionNode extends Node {
    @PlainPro()
    kind: 'UnionTypeExtension';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    @PlainPro({
        isClass: true
    })
    types?: NamedTypeNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitUnionTypeExtensionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            name: visitor.visit(this.name, context),
            directives: visitor.visits(this.directives, context),
            types: visitor.visits(this.types, context),
        }
    }
}
@Plain({
    desc: `EnumTypeExtension`
})
export class EnumTypeExtensionNode extends Node {
    @PlainPro()
    kind: 'EnumTypeExtension';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    @PlainPro({
        isClass: true
    })
    values?: EnumValueDefinitionNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitEnumTypeExtensionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            name: visitor.visit(this.name, context),
            directives: visitor.visits(this.directives, context),
            values: visitor.visits(this.values, context),
        }
    }
}
@Plain({
    desc: 'InputObjectTypeExtension'
})
export class InputObjectTypeExtensionNode extends Node {
    @PlainPro()
    kind: 'InputObjectTypeExtension';
    @PlainPro()
    loc?: Location;
    @PlainPro({
        isClass: true
    })
    name: NameNode;
    @PlainPro({
        isClass: true
    })
    directives?: DirectiveNode[];
    @PlainPro({
        isClass: true
    })
    fields?: InputValueDefinitionNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitInputObjectTypeExtensionNode(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            loc: this.loc,
            name: visitor.visit(this.name, context),
            directives: visitor.visits(this.directives, context),
            fields: visitor.visits(this.fields, context),
        }
    }
}
export interface Visitor {
    visit(node?: Node, context?: any): any;
    visits(nodes?: Node[], context?: any): any;
    visitSelectionSetNode(node: SelectionSetNode, context?: any): any;
    visitFieldNode(node: FieldNode, context?: any): any;
    visitArgumentNode(node: ArgumentNode, context?: any): any;
    visitFragmentSpreadNode(node: FragmentSpreadNode, context?: any): any;
    visitInlineFragmentNode(node: InlineFragmentNode, context?: any): any;
    visitFragmentDefinitionNode(node: FragmentDefinitionNode, context?: any): any;
    visitIntValueNode(node: IntValueNode, context?: any): any;
    visitFloatValueNode(node: FloatValueNode, context?: any): any;
    visitStringValueNode(node: StringValueNode, context?: any): any;
    visitBooleanValueNode(node: BooleanValueNode, context?: any): any;
    visitNullValueNode(node: NullValueNode, context?: any): any;
    visitEnumValueNode(node: EnumValueNode, context?: any): any;
    visitListValueNode(node: ListValueNode, context?: any): any;
    visitObjectValueNode(node: ObjectValueNode, context?: any): any;
    visitObjectFieldNode(node: ObjectFieldNode, context?: any): any;
    visitDirectiveNode(node: DirectiveNode, context?: any): any;
    visitNamedTypeNode(node: NamedTypeNode, context?: any): any;
    visitListTypeNode(node: ListTypeNode, context?: any): any;
    visitNonNullTypeNode(node: NonNullTypeNode, context?: any): any;
    visitSchemaDefinitionNode(node: SchemaDefinitionNode, context?: any): any;
    visitOperationTypeDefinitionNode(node: OperationTypeDefinitionNode, context?: any): any;
    visitScalarTypeDefinitionNode(node: ScalarTypeDefinitionNode, context?: any): any;
    visitObjectTypeDefinitionNode(node: ObjectTypeDefinitionNode, context?: any): any;
    visitFieldDefinitionNode(node: FieldDefinitionNode, context?: any): any;
    visitInputValueDefinitionNode(node: InputValueDefinitionNode, context?: any): any;
    visitInterfaceTypeDefinitionNode(node: InterfaceTypeDefinitionNode, context?: any): any;
    visitUnionTypeDefinitionNode(node: UnionTypeDefinitionNode, context?: any): any;
    visitEnumTypeDefinitionNode(node: EnumTypeDefinitionNode, context?: any): any;
    visitEnumValueDefinitionNode(node: EnumValueDefinitionNode, context?: any): any;
    visitInputObjectTypeDefinitionNode(node: InputObjectTypeDefinitionNode, context?: any): any;
    visitDirectiveDefinitionNode(node: DirectiveDefinitionNode, context?: any): any;
    visitSchemaExtensionNode(node: SchemaExtensionNode, context?: any): any;
    visitScalarTypeExtensionNode(node: ScalarTypeExtensionNode, context?: any): any;
    visitObjectTypeExtensionNode(node: ObjectTypeExtensionNode, context?: any): any;
    visitInterfaceTypeExtensionNode(node: InterfaceTypeExtensionNode, context?: any): any;
    visitUnionTypeExtensionNode(node: UnionTypeExtensionNode, context?: any): any;
    visitEnumTypeExtensionNode(node: EnumTypeExtensionNode, context?: any): any;
    visitInputObjectTypeExtensionNode(node: InputObjectTypeExtensionNode, context?: any): any;
    visitNameNode(node: NameNode, context?: any): any;
    visitDocumentNode(node: DocumentNode, context?: any): any;
    visitOperationDefinitionNode(node: OperationDefinitionNode, context?: any): any;
    visitVariableDefinitionNode(node: VariableDefinitionNode, context?: any): any;
    visitVariableNode(node: VariableNode, context?: any): any;
}
