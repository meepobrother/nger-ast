import { PlainModule, createPlainModule } from '@nger/plain';
import {
    NameNode, DocumentNode, OperationDefinitionNode,
    VariableDefinitionNode, VariableNode,
    SelectionSetNode, FieldNode,
    ArgumentNode, FragmentSpreadNode,
    InlineFragmentNode, FragmentDefinitionNode,
    IntValueNode, FloatValueNode, StringValueNode,
    BooleanValueNode, NullValueNode, EnumValueNode,
    ListValueNode, ObjectValueNode, ObjectFieldNode,
    DirectiveNode, NamedTypeNode, ListTypeNode,
    NonNullTypeNode, SchemaDefinitionNode,
    OperationTypeDefinitionNode, ScalarTypeDefinitionNode,
    ObjectTypeDefinitionNode, FieldDefinitionNode,
    InputValueDefinitionNode, InterfaceTypeDefinitionNode,
    UnionTypeDefinitionNode, EnumTypeDefinitionNode,
    EnumValueDefinitionNode, InputObjectTypeDefinitionNode,
    DirectiveDefinitionNode, SchemaExtensionNode,
    ScalarTypeExtensionNode, ObjectTypeExtensionNode,
    InterfaceTypeExtensionNode, UnionTypeExtensionNode,
    EnumTypeExtensionNode, InputObjectTypeExtensionNode
} from './ast';
@PlainModule({
    imports: [],
    providers: [
        NameNode,
        DocumentNode, OperationDefinitionNode,
        VariableDefinitionNode, VariableNode,
        SelectionSetNode, FieldNode,
        ArgumentNode, FragmentSpreadNode,
        InlineFragmentNode, FragmentDefinitionNode,
        IntValueNode, FloatValueNode, StringValueNode,
        BooleanValueNode, NullValueNode, EnumValueNode,
        ListValueNode, ObjectValueNode, ObjectFieldNode,
        DirectiveNode, NamedTypeNode, ListTypeNode,
        NonNullTypeNode, SchemaDefinitionNode,
        OperationTypeDefinitionNode, ScalarTypeDefinitionNode,
        ObjectTypeDefinitionNode, FieldDefinitionNode,
        InputValueDefinitionNode, InterfaceTypeDefinitionNode,
        UnionTypeDefinitionNode, EnumTypeDefinitionNode,
        EnumValueDefinitionNode, InputObjectTypeDefinitionNode,
        DirectiveDefinitionNode, SchemaExtensionNode,
        ScalarTypeExtensionNode, ObjectTypeExtensionNode,
        InterfaceTypeExtensionNode, UnionTypeExtensionNode,
        EnumTypeExtensionNode, InputObjectTypeExtensionNode
    ]
})
export class AstModule { }
export const moduleRef = createPlainModule(AstModule)
