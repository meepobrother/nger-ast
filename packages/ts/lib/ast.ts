import * as ts from 'typescript';
import { Plain, PlainPro } from '@nger/plain';
export abstract class Node {
    node: ts.Node;
    abstract visit(visitor: Visitor, context?: any): any;
    abstract toJson(visitor: Visitor, context?: any): any;
}
export abstract class TypeNode extends Node { }
export type AccessorDeclaration = GetAccessorDeclaration | SetAccessorDeclaration;
export type FunctionBody = Block;
export type ConciseBody = FunctionBody | Expression;
export type NamedImportBindings = NamespaceImport | NamedImports;
export type Expression = OmittedExpression
    | UnaryExpression
    | UpdateExpression
    | PrefixUnaryExpression
    | YieldExpression
    | SyntheticExpression
    | ConditionalExpression
    | SpreadElement
    | AsExpression
    | JsxOpeningElement
    | JsxOpeningElement
    | JsxClosingFragment
    | JsxExpression
    | CommaListExpression;

export type ModuleName = Identifier | StringLiteral;
export type ModuleBody = NamespaceBody | JSDocNamespaceBody;
export type JSDocNamespaceBody = Identifier | JSDocNamespaceDeclaration;
export type NamespaceBody = ModuleBlock | NamespaceDeclaration;
export type UnaryExpression = UpdateExpression | DeleteExpression | TypeOfExpression | VoidExpression | AwaitExpression | TypeAssertion;
export type UpdateExpression = PrefixUnaryExpression | PostfixUnaryExpression | LeftHandSideExpression;
export type LeftHandSideExpression = MemberExpression | CallExpression | NonNullExpression | PartiallyEmittedExpression;
export type MemberExpression = PrimaryExpression | PropertyAccessExpression | ElementAccessExpression | TaggedTemplateExpression;
export type JsxOpeningLikeElement = JsxSelfClosingElement | JsxOpeningElement;
export type JsxAttributeLike = JsxAttribute | JsxSpreadAttribute;
export type JsxTagNameExpression = Identifier | ThisExpression | JsxTagNamePropertyAccess;
export type PrimaryExpression = Identifier
    | NullLiteral
    | BooleanLiteral
    | ThisExpression
    | SuperExpression
    | ImportExpression
    | FunctionExpression
    | TemplateExpression
    | ParenthesizedExpression
    | ArrayLiteralExpression
    | ObjectLiteralExpressionBase
    | NewExpression
    | MetaProperty
    | JsxElement
    | JsxSelfClosingElement
    | JsxFragment;
export type ObjectLiteralExpressionBase = ObjectLiteralExpression | JsxAttributes;
export type ObjectLiteralElementLike = PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment | MethodDeclaration | AccessorDeclaration;
export type Statement = NotEmittedStatement
    | EmptyStatement
    | DebuggerStatement
    | Block
    | VariableStatement
    | ExpressionStatement
    | IfStatement
    | IterationStatement
    | BreakStatement
    | ContinueStatement
    | ReturnStatement
    | WithStatement
    | SwitchStatement
    | LabeledStatement
    | ThrowStatement
    | TryStatement
    | ImportDeclaration;
export type IterationStatement = DoStatement | WhileStatement | ForStatement | ForInStatement | ForOfStatement;
export type ForInitializer = VariableDeclarationList | Expression;
export type BindingPattern = ObjectBindingPattern | ArrayBindingPattern;
export type BindingName = Identifier | BindingPattern;
export type ArrayBindingElement = BindingElement | OmittedExpression;
export type CaseOrDefaultClause = CaseClause | DefaultClause;
export type JsxChild = JsxText | JsxExpression | JsxElement | JsxSelfClosingElement | JsxFragment;
export type TemplateLiteral = TemplateExpression | NoSubstitutionTemplateLiteral;
export type ObjectTypeDeclaration = ClassLikeDeclaration | InterfaceDeclaration | TypeLiteralNode;
export type DeclarationWithTypeParameters = DeclarationWithTypeParameterChildren | JSDocTypedefTag | JSDocCallbackTag | JSDocSignature;
export type DeclarationWithTypeParameterChildren = SignatureDeclaration | ClassLikeDeclaration | InterfaceDeclaration | TypeAliasDeclaration | JSDocTemplateTag;
export type SignatureDeclaration = CallSignatureDeclaration | ConstructSignatureDeclaration | MethodSignature | IndexSignatureDeclaration | FunctionTypeNode | ConstructorTypeNode | JSDocFunctionType | FunctionDeclaration | MethodDeclaration | ConstructorDeclaration | AccessorDeclaration | FunctionExpression | ArrowFunction;
export type ClassLikeDeclaration = ClassDeclaration | ClassExpression;
export type HasJSDoc = ParameterDeclaration
    | CallSignatureDeclaration | ConstructSignatureDeclaration | MethodSignature
    | PropertySignature | ArrowFunction | ParenthesizedExpression | SpreadAssignment
    | ShorthandPropertyAssignment | PropertyAssignment | FunctionExpression
    | LabeledStatement | ExpressionStatement | VariableStatement
    | FunctionDeclaration | ConstructorDeclaration | MethodDeclaration
    | PropertyDeclaration | AccessorDeclaration | ClassLikeDeclaration
    | InterfaceDeclaration | TypeAliasDeclaration | EnumMember
    | EnumDeclaration | ModuleDeclaration | ImportEqualsDeclaration
    | IndexSignatureDeclaration | FunctionTypeNode | ConstructorTypeNode
    | JSDocFunctionType | ExportDeclaration | EndOfFileToken;
export type HasType = SignatureDeclaration
    | VariableDeclaration | ParameterDeclaration
    | PropertySignature | PropertyDeclaration
    | TypePredicateNode | ParenthesizedTypeNode
    | TypeOperatorNode | MappedTypeNode | AssertionExpression
    | TypeAliasDeclaration | JSDocTypeExpression
    | JSDocNonNullableType | JSDocNullableType
    | JSDocOptionalType | JSDocVariadicType;
export type HasInitializer = HasExpressionInitializer | ForStatement | ForInStatement | ForOfStatement | JsxAttribute;
export type HasExpressionInitializer = VariableDeclaration | ParameterDeclaration | BindingElement | PropertySignature | PropertyDeclaration | PropertyAssignment | EnumMember;
export type TypeElement = PropertySignature;
export type EntityName = Identifier | QualifiedName;
export type PropertyName = Identifier | StringLiteral | NumericLiteral | ComputedPropertyName;
export type DeclarationName = Identifier | StringLiteralLike | NumericLiteral | ComputedPropertyName | ElementAccessExpression | BindingPattern | EntityNameExpression;
export type StringLiteralLike = StringLiteral | NoSubstitutionTemplateLiteral;
export type EntityNameExpression = Identifier | PropertyAccessEntityNameExpression;
export type EntityNameOrEntityNameExpression = EntityName | EntityNameExpression;
export type ModuleReference = EntityName | ExternalModuleReference;
export type AssertionExpression = TypeAssertion | AsExpression;
export type TypeReferenceType = TypeReferenceNode | ExpressionWithTypeArguments;
export type ClassElement = PropertyDeclaration | SemicolonClassElement | MethodDeclaration;
export type Modifier = ts.Token<ts.SyntaxKind.AbstractKeyword> | ts.Token<ts.SyntaxKind.AsyncKeyword> | ts.Token<ts.SyntaxKind.ConstKeyword> | ts.Token<ts.SyntaxKind.DeclareKeyword> | ts.Token<ts.SyntaxKind.DefaultKeyword> | ts.Token<ts.SyntaxKind.ExportKeyword> | ts.Token<ts.SyntaxKind.PublicKeyword> | ts.Token<ts.SyntaxKind.PrivateKeyword> | ts.Token<ts.SyntaxKind.ProtectedKeyword> | ts.Token<ts.SyntaxKind.ReadonlyKeyword> | ts.Token<ts.SyntaxKind.StaticKeyword>;

@Plain({
    desc: ts.SyntaxKind.TypeReference
})
export class TypeReferenceNode extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.TypeReference;
    @PlainPro({
        isClass: true
    })
    typeName: EntityName;
    @PlainPro({
        isClass: true
    })
    typeArguments?: TypeNode[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitTypeReferenceNode(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.Block
})
export class Block extends Node {
    toJson(visitor: Visitor, context?: any): any {
        return {
            kind: this.kind,
            statements: visitor.visits(this.statements, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.Block;
    @PlainPro({
        isClass: true
    })
    statements: Statement[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitBlock(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.Identifier
})
export class Identifier extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            escapedText: this.escapedText,
            originalKeywordKind: this.originalKeywordKind,
            isInJSDocNamespace: this.isInJSDocNamespace
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.Identifier;
    @PlainPro()
    escapedText: string;
    @PlainPro()
    originalKeywordKind?: ts.SyntaxKind;
    @PlainPro()
    isInJSDocNamespace: boolean;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitIdentifier(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JSDocOptionalType
})
export class JSDocOptionalType extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            type: visitor.visit(this.type, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocOptionalType;
    @PlainPro({
        isClass: true
    })
    type: TypeNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocOptionalType(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JSDocVariadicType
})
export class JSDocVariadicType extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            type: visitor.visit(this.type, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocVariadicType;
    @PlainPro({
        isClass: true
    })
    type: TypeNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocVariadicType(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JSDocNonNullableType
})
export class JSDocNonNullableType extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            type: visitor.visit(this.type, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocNonNullableType;
    @PlainPro({
        isClass: true
    })
    type: TypeNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocNonNullableType(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JSDocNullableType
})
export class JSDocNullableType extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            type: visitor.visit(this.type, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocNullableType;
    @PlainPro({
        isClass: true
    })
    type: TypeNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocNullableType(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.TypeOperator
})
export class TypeOperatorNode extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            operator: this.operator,
            type: visitor.visit(this.type, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.TypeOperator;
    @PlainPro()
    operator: ts.SyntaxKind.KeyOfKeyword | ts.SyntaxKind.UniqueKeyword | ts.SyntaxKind.ReadonlyKeyword;
    @PlainPro({ isClass: true })
    type: TypeNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitTypeOperatorNode(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.TypeParameter
})
export class TypeParameterDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            name: visitor.visit(this.name, context),
            constraint: visitor.visit(this.constraint, context),
            default: visitor.visit(this.default, context),
            expression: visitor.visit(this.expression, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.TypeParameter;
    @PlainPro({ isClass: true })
    name: Identifier;
    @PlainPro({ isClass: true })
    constraint?: TypeNode;
    @PlainPro({ isClass: true })
    default?: TypeNode;
    @PlainPro({ isClass: true })
    expression?: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitTypeParameterDeclaration(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.MappedType
})
export class MappedTypeNode extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            readonlyToken: this.readonlyToken,
            questionToken: this.questionToken,
            typeParameter: visitor.visit(this.typeParameter, context),
            type: visitor.visit(this.type, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.MappedType;
    @PlainPro()
    readonlyToken?: ts.ReadonlyToken | ts.PlusToken | ts.MinusToken;
    @PlainPro({ isClass: true })
    typeParameter: TypeParameterDeclaration;
    @PlainPro()
    questionToken?: ts.QuestionToken | ts.PlusToken | ts.MinusToken;
    @PlainPro({ isClass: true })
    type?: TypeNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitMappedTypeNode(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.TypePredicate
})
export class TypePredicateNode extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            assertsModifier: this.assertsModifier,
            parameterName: visitor.visit(this.parameterName, context),
            type: visitor.visit(this.type, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.TypePredicate;
    @PlainPro()
    assertsModifier?: ts.AssertsToken;
    @PlainPro({ isClass: true })
    parameterName: Identifier | ThisTypeNode;
    @PlainPro({ isClass: true })
    type?: TypeNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitTypePredicateNode(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ThisType
})
export class ThisTypeNode extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.ThisType;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitThisTypeNode(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ParenthesizedType
})
export class ParenthesizedTypeNode extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            type: visitor.visit(this.type, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.ParenthesizedType;
    @PlainPro({ isClass: true })
    type: TypeNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitParenthesizedTypeNode(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ExternalModuleReference
})
export class ExternalModuleReference extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            expression: visitor.visit(this.expression, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.ExternalModuleReference;
    @PlainPro({ isClass: true })
    expression: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitExternalModuleReference(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.NamedExports
})
export class NamedExports extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            elements: visitor.visits(this.elements, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.NamedExports;
    @PlainPro({ isClass: true })
    elements: ExportSpecifier[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitNamedExports(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ExportDeclaration
})
export class ExportDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            exportClause: visitor.visit(this.exportClause, context),
            moduleSpecifier: visitor.visit(this.moduleSpecifier, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.ExportDeclaration;
    @PlainPro({ isClass: true })
    exportClause?: NamedExports;
    @PlainPro({ isClass: true })
    moduleSpecifier?: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitExportDeclaration(this, context)
    }
}

@Plain({
    desc: ts.SyntaxKind.ExportSpecifier
})
export class ExportSpecifier extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            propertyName: visitor.visit(this.propertyName, context),
            name: visitor.visit(this.name, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.ExportSpecifier;
    @PlainPro({ isClass: true })
    propertyName?: Identifier;
    @PlainPro({ isClass: true })
    name: Identifier;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitExportSpecifier(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.EndOfFileToken
})
export class EndOfFileToken extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.EndOfFileToken;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitEndOfFileToken(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.EnumMember
})
export class EnumMember extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            name: visitor.visit(this.name, context),
            initializer: visitor.visit(this.initializer, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.EnumMember;
    @PlainPro({ isClass: true })
    name: PropertyName;
    @PlainPro({ isClass: true })
    initializer?: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitEnumMember(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ModuleDeclaration
})
export class ModuleDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            name: visitor.visit(this.name, context),
            body: visitor.visit(this.body, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.ModuleDeclaration;
    @PlainPro({
        isClass: true
    })
    name: ModuleName;
    @PlainPro({
        isClass: true
    })
    body?: ModuleBody | JSDocNamespaceDeclaration;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitModuleDeclaration(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ImportEqualsDeclaration
})
export class ImportEqualsDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            name: visitor.visit(this.name, context),
            moduleReference: visitor.visit(this.moduleReference, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.ImportEqualsDeclaration;
    @PlainPro({
        isClass: true
    })
    name: Identifier;
    @PlainPro({
        isClass: true
    })
    moduleReference: ModuleReference;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitImportEqualsDeclaration(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.SourceFile
})
export class SourceFile extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            endOfFileToken: this.endOfFileToken,
            fileName: this.fileName,
            text: this.text,
            amdDependencies: this.amdDependencies,
            moduleName: this.moduleName,
            referencedFiles: this.referencedFiles,
            typeReferenceDirectives: this.typeReferenceDirectives,
            languageVariant: this.languageVariant,
            libReferenceDirectives: this.libReferenceDirectives,
            isDeclarationFile: this.isDeclarationFile,
            hasNoDefaultLib: this.hasNoDefaultLib,
            languageVersion: this.languageVersion,
            statements: visitor.visits(this.statements, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.SourceFile;
    @PlainPro({
        isClass: true
    })
    statements: Statement[];
    @PlainPro()
    endOfFileToken: ts.Token<ts.SyntaxKind.EndOfFileToken>;
    @PlainPro()
    fileName: string;
    @PlainPro()
    text: string;
    @PlainPro()
    amdDependencies: ts.AmdDependency[];
    @PlainPro()
    moduleName?: string;
    @PlainPro()
    referencedFiles: ts.FileReference[];
    @PlainPro()
    typeReferenceDirectives: ts.FileReference[];
    @PlainPro()
    libReferenceDirectives: ts.FileReference[];
    @PlainPro()
    languageVariant: ts.LanguageVariant;
    @PlainPro()
    isDeclarationFile: boolean;
    @PlainPro()
    hasNoDefaultLib: boolean;
    @PlainPro()
    languageVersion: ts.ScriptTarget;
    @PlainPro()
    locals: Map<string, ts.Symbol>;
    @PlainPro()
    identifiers: Map<string, string>;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitSourceFile(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.Constructor
})
export class ConstructorDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            asteriskToken: this.asteriskToken,
            questionToken: this.questionToken,
            exclamationToken: this.exclamationToken,
            name: visitor.visit(this.name, context),
            typeParameters: visitor.visits(this.typeParameters, context),
            parameters: visitor.visits(this.parameters, context),
            type: visitor.visit(this.type, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.Constructor;
    @PlainPro({ isClass: true })
    body?: FunctionBody;
    @PlainPro()
    asteriskToken?: ts.AsteriskToken;
    @PlainPro()
    questionToken?: ts.QuestionToken;
    @PlainPro()
    exclamationToken?: ts.ExclamationToken;
    @PlainPro({ isClass: true })
    name?: PropertyName;
    @PlainPro({ isClass: true })
    typeParameters?: TypeParameterDeclaration[];
    @PlainPro({ isClass: true })
    parameters: ParameterDeclaration[];
    @PlainPro({ isClass: true })
    type?: TypeNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitConstructorDeclaration(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.FunctionDeclaration
})
export class FunctionDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            name: visitor.visit(this.name, context),
            body: visitor.visit(this.body, context),
            asteriskToken: this.asteriskToken,
            questionToken: this.questionToken,
            exclamationToken: this.exclamationToken,
            typeParameters: visitor.visits(this.typeParameters, context),
            parameters: visitor.visits(this.parameters, context),
            type: visitor.visit(this.type, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.FunctionDeclaration;
    @PlainPro({ isClass: true })
    name?: Identifier;
    @PlainPro({ isClass: true })
    body?: FunctionBody;
    @PlainPro()
    asteriskToken?: ts.AsteriskToken;
    @PlainPro()
    questionToken?: ts.QuestionToken;
    @PlainPro()
    exclamationToken?: ts.ExclamationToken;
    @PlainPro({ isClass: true })
    typeParameters?: TypeParameterDeclaration[];
    @PlainPro({ isClass: true })
    parameters: ParameterDeclaration[];
    @PlainPro({ isClass: true })
    type?: TypeNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitFunctionDeclaration(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JSDocFunctionType
})
export class JSDocFunctionType extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocFunctionType;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocFunctionType(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.FunctionType
})
export class FunctionTypeNode extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.FunctionType;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitFunctionTypeNode(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ConstructorType
})
export class ConstructorTypeNode extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.ConstructorType;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitConstructorTypeNode(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.IndexSignature
})
export class IndexSignatureDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.IndexSignature;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitIndexSignatureDeclaration(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.MethodSignature
})
export class MethodSignature extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            name: visitor.visit(this.name, context),
            typeParameters: visitor.visits(this.typeParameters, context),
            parameters: visitor.visits(this.parameters, context),
            type: visitor.visit(this.type, context),
            questionToken: this.questionToken
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.MethodSignature;
    @PlainPro({
        isClass: true
    })
    name: PropertyName;
    @PlainPro({
        isClass: true
    })
    typeParameters?: TypeParameterDeclaration[];
    @PlainPro({
        isClass: true
    })
    parameters: ParameterDeclaration[];
    @PlainPro({
        isClass: true
    })
    type?: TypeNode;
    @PlainPro()
    questionToken?: ts.QuestionToken;

    visit(visitor: Visitor, context?: any) {
        return visitor.visitMethodSignature(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ConstructSignature
})
export class ConstructSignatureDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.ConstructSignature;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitConstructSignatureDeclaration(this, context)
    }
}
@Plain({
    desc: [
        ts.SyntaxKind.AnyKeyword, ts.SyntaxKind.UnknownKeyword,
        ts.SyntaxKind.NumberKeyword, ts.SyntaxKind.BigIntKeyword,
        ts.SyntaxKind.ObjectKeyword, ts.SyntaxKind.BooleanKeyword,
        ts.SyntaxKind.StringKeyword, ts.SyntaxKind.SymbolKeyword,
        ts.SyntaxKind.AnyKeyword, ts.SyntaxKind.UnknownKeyword,
        ts.SyntaxKind.NumberKeyword, ts.SyntaxKind.BigIntKeyword,
        ts.SyntaxKind.ObjectKeyword, ts.SyntaxKind.BooleanKeyword,
        ts.SyntaxKind.StringKeyword, ts.SyntaxKind.SymbolKeyword,
        ts.SyntaxKind.ThisKeyword, ts.SyntaxKind.VoidKeyword,
        ts.SyntaxKind.UndefinedKeyword, ts.SyntaxKind.NullKeyword,
        ts.SyntaxKind.NeverKeyword
    ]
})
export class KeywordTypeNode extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            keyword: this.keyword
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.AnyKeyword
        | ts.SyntaxKind.UnknownKeyword
        | ts.SyntaxKind.NumberKeyword
        | ts.SyntaxKind.BigIntKeyword
        | ts.SyntaxKind.ObjectKeyword
        | ts.SyntaxKind.BooleanKeyword
        | ts.SyntaxKind.StringKeyword
        | ts.SyntaxKind.SymbolKeyword
        | ts.SyntaxKind.ThisKeyword
        | ts.SyntaxKind.VoidKeyword
        | ts.SyntaxKind.UndefinedKeyword
        | ts.SyntaxKind.NullKeyword
        | ts.SyntaxKind.NeverKeyword;
    get keyword() {
        switch (this.kind) {
            case ts.SyntaxKind.AnyKeyword:
                return 'any';
            case ts.SyntaxKind.UnknownKeyword:
                return 'unknown';
            case ts.SyntaxKind.NumberKeyword:
                return 'number';
            case ts.SyntaxKind.BigIntKeyword:
                return 'bigint';
            case ts.SyntaxKind.ObjectKeyword:
                return 'object';
            case ts.SyntaxKind.BooleanKeyword:
                return 'boolean';
            case ts.SyntaxKind.SymbolKeyword:
                return 'symbol';
            case ts.SyntaxKind.ThisKeyword:
                return 'this';
            case ts.SyntaxKind.VoidKeyword:
                return 'void';
            case ts.SyntaxKind.UndefinedKeyword:
                return 'undefined';
            case ts.SyntaxKind.StringKeyword:
                return 'string';
            default:
                return 'nerver';
        }
    }
    visit(visitor: Visitor, context?: any) {
        return visitor.visitKeywordTypeNode(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.CallSignature
})
export class CallSignatureDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.CallSignature;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitCallSignatureDeclaration(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ArrowFunction
})
export class ArrowFunction extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            name: this.name,
            equalsGreaterThanToken: this.equalsGreaterThanToken,
            body: visitor.visit(this.body, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.ArrowFunction;
    @PlainPro()
    equalsGreaterThanToken: ts.EqualsGreaterThanToken;
    @PlainPro({
        isClass: true
    })
    body: ConciseBody;
    @PlainPro()
    name: never;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitArrowFunction(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.TypeAliasDeclaration
})
export class TypeAliasDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            name: visitor.visit(this.name, context),
            typeParameters: visitor.visits(this.typeParameters, context),
            type: visitor.visit(this.type, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.TypeAliasDeclaration;
    @PlainPro({ isClass: true })
    name: Identifier;
    @PlainPro({ isClass: true })
    typeParameters?: TypeParameterDeclaration[];
    @PlainPro({ isClass: true })
    type: TypeNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitTypeAliasDeclaration(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.EnumDeclaration
})
export class EnumDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            name: visitor.visit(this.name, context),
            members: visitor.visits(this.members, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.EnumDeclaration;
    @PlainPro({ isClass: true })
    name: Identifier;
    @PlainPro({ isClass: true })
    members: EnumMember[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitEnumDeclaration(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.PropertyAccessExpression
})
export class PropertyAccessEntityNameExpression extends Node {
    toJson(visitor: Visitor, context?: any): any {
        return {
            kind: this.kind,
            questionDotToken: this.questionDotToken,
            name: visitor.visit(this.name, context),
            expression: visitor.visit(this.expression, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.PropertyAccessExpression;
    @PlainPro()
    questionDotToken?: ts.QuestionDotToken;
    @PlainPro({ isClass: true })
    name: Identifier;
    @PlainPro({ isClass: true })
    expression: EntityNameExpression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitPropertyAccessEntityNameExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JSDocSignature
})
export class JSDocSignature extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            typeParameters: visitor.visits(this.typeParameters, context),
            parameters: visitor.visits(this.parameters, context),
            type: visitor.visit(this.type, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocSignature;
    @PlainPro({ isClass: true })
    typeParameters?: JSDocTemplateTag[];
    @PlainPro({ isClass: true })
    parameters: JSDocParameterTag[];
    @PlainPro({ isClass: true })
    type: JSDocReturnTag | undefined;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocSignature(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JSDocCallbackTag
})
export class JSDocCallbackTag extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            fullName: visitor.visit(this.fullName, context),
            name: visitor.visit(this.name, context),
            typeExpression: visitor.visit(this.typeExpression, context),
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocCallbackTag;
    @PlainPro({ isClass: true })
    fullName?: JSDocNamespaceDeclaration | Identifier;
    @PlainPro({ isClass: true })
    name?: Identifier;
    @PlainPro({ isClass: true })
    typeExpression: JSDocSignature;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocCallbackTag(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JSDocTypeExpression
})
export class JSDocTypeExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            type: visitor.visit(this.type, context),
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocTypeExpression;
    @PlainPro({
        isClass: true
    })
    type: TypeNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocTypeExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JSDocTemplateTag
})
export class JSDocTemplateTag extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            constraint: visitor.visit(this.constraint, context),
            typeParameters: visitor.visits(this.typeParameters, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocTemplateTag;
    @PlainPro({ isClass: true })
    constraint: JSDocTypeExpression | undefined;
    @PlainPro({ isClass: true })
    typeParameters: TypeParameterDeclaration[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocTemplateTag(this, context)
    }
}

@Plain({
    desc: ts.SyntaxKind.JSDocParameterTag
})
export class JSDocParameterTag extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocParameterTag;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocParameterTag(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JSDocReturnTag
})
export class JSDocReturnTag extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            typeExpression: visitor.visit(this.typeExpression, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocReturnTag;
    @PlainPro({ isClass: true })
    typeExpression?: JSDocTypeExpression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocReturnTag(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ClassExpression
})
export class ClassExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.ClassExpression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitClassExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.Decorator
})
export class Decorator extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            expression: visitor.visit(this.expression, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.Decorator;
    @PlainPro({ isClass: true })
    expression: LeftHandSideExpression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitDecorator(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.QualifiedName
})
export class QualifiedName extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            left: visitor.visit(this.left, context),
            right: visitor.visit(this.right, context),
            decorators: visitor.visits(this.decorators, context),
            modifiers: this.modifiers,
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.QualifiedName;
    @PlainPro({ isClass: true })
    left: EntityName;
    @PlainPro({ isClass: true })
    right: Identifier;
    @PlainPro({ isClass: true })
    decorators?: Decorator[];
    @PlainPro({ isClass: true })
    modifiers?: Modifier[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitQualifiedName(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JSDocComment
})
export class JSDoc extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            tags: visitor.visits(this.tags, context),
            comment: this.comment
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocComment;
    @PlainPro({ isClass: true })
    tags?: JSDocTag[];
    @PlainPro()
    comment?: string;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDoc(this, context)
    }
}
export type JSDocPropertyLikeTag = JSDocPropertyTag | JSDocParameterTag;
export type JSDocTag =
    JSDocUnknownTag | JSDocAugmentsTag
    | JSDocAuthorTag | JSDocClassTag
    | JSDocEnumTag | JSDocThisTag
    | JSDocTemplateTag | JSDocReturnTag
    | JSDocTypeTag | JSDocTypedefTag
    | JSDocCallbackTag | JSDocPropertyLikeTag;
@Plain({
    desc: ts.SyntaxKind.JSDocTag
})
export class JSDocUnknownTag extends Node {
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocUnknownTag(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocTag;
}

@Plain({
    desc: ts.SyntaxKind.ExpressionWithTypeArguments
})
export class ExpressionWithTypeArguments extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            expression: visitor.visit(this.expression, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.ExpressionWithTypeArguments;
    @PlainPro({
        isClass: true
    })
    expression: LeftHandSideExpression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitExpressionWithTypeArguments(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JSDocAugmentsTag
})
export class JSDocAugmentsTag extends Node {
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocAugmentsTag(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            class: visitor.visit(this.class, context)
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocAugmentsTag;
    @PlainPro({ isClass: true })
    class: ExpressionWithTypeArguments;
}
@Plain({
    desc: ts.SyntaxKind.JSDocAuthorTag
})
export class JSDocAuthorTag extends Node {
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocAuthorTag(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocAuthorTag;
}
@Plain({
    desc: ts.SyntaxKind.JSDocClassTag
})
export class JSDocClassTag extends Node {
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocClassTag(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocClassTag;
}
@Plain({
    desc: ts.SyntaxKind.JSDocEnumTag
})
export class JSDocEnumTag extends Node {
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocEnumTag(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocEnumTag;
    @PlainPro({ isClass: true })
    typeExpression?: JSDocTypeExpression;
}
@Plain({
    desc: ts.SyntaxKind.JSDocThisTag
})
export class JSDocThisTag extends Node {
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocThisTag(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocThisTag;
    @PlainPro({ isClass: true })
    typeExpression?: JSDocTypeExpression;
}
@Plain({
    desc: ts.SyntaxKind.JSDocTypeTag
})
export class JSDocTypeTag extends Node {
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocTypeTag(this, context)
    }
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocTypeTag;
    @PlainPro({ isClass: true })
    typeExpression: JSDocTypeExpression;
}

@Plain({
    desc: ts.SyntaxKind.JSDocTypeLiteral
})
export class JSDocTypeLiteral extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocTypeLiteral;
    @PlainPro({
        isClass: true
    })
    jsDocPropertyTags?: JSDocPropertyLikeTag[];
    @PlainPro()
    isArrayType?: boolean;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocTypeLiteral(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JSDocPropertyTag
})
export class JSDocPropertyTag extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocPropertyTag;
    @PlainPro({
        isClass: true
    })
    name: EntityName;
    @PlainPro({
        isClass: true
    })
    typeExpression?: JSDocTypeExpression;
    @PlainPro()
    isNameFirst: boolean;
    @PlainPro()
    isBracketed: boolean;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocPropertyTag(this, context)
    }
}

@Plain({
    desc: ts.SyntaxKind.JSDocTypedefTag
})
export class JSDocTypedefTag extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.JSDocTypedefTag;
    @PlainPro({
        isClass: true
    })
    fullName?: JSDocNamespaceDeclaration | Identifier;
    @PlainPro({
        isClass: true
    })
    name?: Identifier;
    @PlainPro({
        isClass: true
    })
    typeExpression?: JSDocTypeExpression | JSDocTypeLiteral;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocTypedefTag(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.TypeLiteral
})
export class TypeLiteralNode extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.TypeLiteral;
    @PlainPro({
        isClass: true
    })
    members: TypeElement;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitTypeLiteralNode(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.PropertySignature
})
export class PropertySignature extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.PropertySignature;
    @PlainPro({
        isClass: true
    })
    name: PropertyName;
    @PlainPro()
    questionToken?: ts.QuestionToken;
    @PlainPro({
        isClass: true
    })
    type?: TypeNode;
    @PlainPro({
        isClass: true
    })
    initializer?: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitPropertySignature(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.InterfaceDeclaration
})
export class InterfaceDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.InterfaceDeclaration;
    @PlainPro({
        isClass: true
    })
    name: Identifier;
    @PlainPro({
        isClass: true
    })
    typeParameters?: TypeParameterDeclaration[];
    @PlainPro({
        isClass: true
    })
    heritageClauses?: HeritageClause[];
    @PlainPro({
        isClass: true
    })
    members: TypeElement[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitInterfaceDeclaration(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.NoSubstitutionTemplateLiteral
})
export class NoSubstitutionTemplateLiteral extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.NoSubstitutionTemplateLiteral;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitNoSubstitutionTemplateLiteral(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.GetAccessor
})
export class GetAccessorDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.GetAccessor;
    @PlainPro({ isClass: true })
    name: PropertyName;
    @PlainPro({ isClass: true })
    body?: FunctionBody;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitGetAccessorDeclaration(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.SetAccessor
})
export class SetAccessorDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.SetAccessor;
    @PlainPro({ isClass: true })
    name: PropertyName;
    @PlainPro({ isClass: true })
    body?: FunctionBody;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitSetAccessorDeclaration(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.MethodDeclaration
})
export class MethodDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.MethodDeclaration;
    @PlainPro({
        isClass: true
    })
    name: PropertyName;
    @PlainPro({
        isClass: true
    })
    body?: FunctionBody;
    @PlainPro()
    asteriskToken?: ts.AsteriskToken;
    @PlainPro()
    questionToken?: ts.QuestionToken;
    @PlainPro()
    exclamationToken?: ts.ExclamationToken;
    @PlainPro()
    typeParameters?: TypeParameterDeclaration[];
    @PlainPro()
    parameters: ParameterDeclaration[];
    @PlainPro()
    type?: TypeNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitMethodDeclaration(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.TaggedTemplateExpression
})
export class TaggedTemplateExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.TaggedTemplateExpression;
    @PlainPro({ isClass: true })
    tag: LeftHandSideExpression;
    @PlainPro({ isClass: true })
    typeArguments?: TypeNode[];
    @PlainPro({ isClass: true })
    template: TemplateLiteral;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitTaggedTemplateExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JsxText
})
export class JsxText extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.JsxText;
    @PlainPro()
    containsOnlyTriviaWhiteSpaces: boolean;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJsxText(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.SpreadAssignment
})
export class SpreadAssignment extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.SpreadAssignment;
    @PlainPro({ isClass: true })
    expression: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitSpreadAssignment(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.PropertyAssignment
})
export class PropertyAssignment extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.PropertyAssignment;
    @PlainPro({ isClass: true })
    name: PropertyName;
    @PlainPro()
    questionToken?: ts.QuestionToken;
    @PlainPro({ isClass: true })
    initializer: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitPropertyAssignment(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ShorthandPropertyAssignment
})
export class ShorthandPropertyAssignment extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ShorthandPropertyAssignment;
    @PlainPro({ isClass: true })
    name: Identifier;
    @PlainPro()
    questionToken?: ts.QuestionToken;
    @PlainPro()
    exclamationToken?: ts.ExclamationToken;
    @PlainPro()
    equalsToken?: ts.Token<ts.SyntaxKind.EqualsToken>;
    @PlainPro({ isClass: true })
    objectAssignmentInitializer?: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitShorthandPropertyAssignment(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.EmptyStatement
})
export class EmptyStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.EmptyStatement;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitEmptyStatement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.PropertyAccessExpression
})
export class JsxTagNamePropertyAccess extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.PropertyAccessExpression;
    @PlainPro()
    questionDotToken?: ts.QuestionDotToken;
    @PlainPro({ isClass: true })
    name: Identifier;
    @PlainPro({ isClass: true })
    expression: JsxTagNameExpression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJsxTagNamePropertyAccess(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.IfStatement
})
export class IfStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.IfStatement;
    @PlainPro({ isClass: true })
    expression: Expression;
    @PlainPro({ isClass: true })
    thenStatement: Statement;
    @PlainPro({ isClass: true })
    elseStatement?: Statement;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitIfStatement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ExpressionStatement
})
export class ExpressionStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ExpressionStatement;
    @PlainPro({ isClass: true })
    expression: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitExpressionStatement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.DebuggerStatement
})
export class DebuggerStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.DebuggerStatement;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitDebuggerStatement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.NotEmittedStatement
})
export class NotEmittedStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.NotEmittedStatement;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitNotEmittedStatement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.DefaultClause
})
export class DefaultClause extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.DefaultClause;
    @PlainPro({
        isClass: true
    })
    statements: Statement;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitDefaultClause(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ModuleDeclaration
})
export class NamespaceDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ModuleDeclaration;
    @PlainPro({
        isClass: true
    })
    name: Identifier;
    @PlainPro({
        isClass: true
    })
    body: NamespaceBody;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitNamespaceDeclaration(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.NamedImports
})
export class NamedImports extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.NamedImports;
    @PlainPro({
        isClass: true
    })
    elements: ImportSpecifier[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitNamedImports(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ImportSpecifier
})
export class ImportSpecifier extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ImportSpecifier;
    @PlainPro({ isClass: true })
    propertyName?: Identifier;
    @PlainPro({ isClass: true })
    name: Identifier;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitImportSpecifier(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.NamespaceImport
})
export class NamespaceImport extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.NamespaceImport;
    @PlainPro({ isClass: true })
    name: Identifier;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitNamespaceImport(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.CaseClause
})
export class CaseClause extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.CaseClause;
    @PlainPro({
        isClass: true
    })
    expression: Expression;
    @PlainPro({
        isClass: true
    })
    statements: Statement;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitCaseClause(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ComputedPropertyName
})
export class ComputedPropertyName extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ComputedPropertyName;
    @PlainPro({ isClass: true })
    expression: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitComputedPropertyName(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ObjectBindingPattern
})
export class ObjectBindingPattern extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ObjectBindingPattern;
    @PlainPro({
        isClass: true
    })
    elements: BindingElement[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitObjectBindingPattern(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ArrayBindingPattern
})
export class ArrayBindingPattern extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ArrayBindingPattern;
    @PlainPro({
        isClass: true
    })
    elements: ArrayBindingElement[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitArrayBindingPattern(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.Parameter
})
export class ParameterDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.Parameter;
    @PlainPro()
    dotDotDotToken?: ts.DotDotDotToken;
    @PlainPro({
        isClass: true
    })
    name: BindingName;
    @PlainPro()
    questionToken?: ts.QuestionToken;
    @PlainPro({
        isClass: true
    })
    type?: TypeNode;
    @PlainPro({
        isClass: true
    })
    initializer?: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitParameterDeclaration(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.BindingElement
})
export class BindingElement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.BindingElement;
    @PlainPro({ isClass: true })
    propertyName?: PropertyName;
    @PlainPro()
    dotDotDotToken?: ts.DotDotDotToken;
    @PlainPro({ isClass: true })
    name: BindingName;
    @PlainPro({ isClass: true })
    initializer?: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitBindingElement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.VariableDeclarationList
})
export class VariableDeclarationList extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.VariableDeclarationList;
    @PlainPro({
        isClass: true
    })
    declarations: VariableDeclaration[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitVariableDeclarationList(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.VariableStatement
})
export class VariableStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.VariableStatement;
    @PlainPro({
        isClass: true
    })
    declarationList: VariableDeclarationList;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitVariableStatement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.VariableDeclaration
})
export class VariableDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.VariableDeclaration;
    @PlainPro({
        isClass: true
    })
    name: BindingName;
    exclamationToken?: ts.ExclamationToken;
    @PlainPro({
        isClass: true
    })
    type?: TypeNode;
    @PlainPro({
        isClass: true
    })
    initializer?: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitVariableDeclaration(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.DoStatement
})
export class DoStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.DoStatement;
    @PlainPro({
        isClass: true
    })
    expression: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitDoStatement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.WhileStatement
})
export class WhileStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.WhileStatement;
    @PlainPro({
        isClass: true
    })
    expression: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitWhileStatement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ForStatement
})
export class ForStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ForStatement;
    @PlainPro({
        isClass: true
    })
    initializer?: ForInitializer;
    @PlainPro({
        isClass: true
    })
    condition?: Expression;
    @PlainPro({
        isClass: true
    })
    incrementor?: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitForStatement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ForInStatement
})
export class ForInStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ForInStatement;
    @PlainPro({
        isClass: true
    })
    initializer: ForInitializer;
    @PlainPro({
        isClass: true
    })
    expression: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitForInStatement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ForOfStatement
})
export class ForOfStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ForOfStatement;
    @PlainPro()
    awaitModifier?: ts.AwaitKeywordToken;
    @PlainPro({
        isClass: true
    })
    initializer: ForInitializer;
    @PlainPro({
        isClass: true
    })
    expression: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitForOfStatement(this, context)
    }
}


@Plain({
    desc: ts.SyntaxKind.BreakStatement
})
export class BreakStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.BreakStatement;
    @PlainPro({
        isClass: true
    })
    label?: Identifier;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitBreakStatement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ContinueStatement
})
export class ContinueStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ContinueStatement;
    @PlainPro({
        isClass: true
    })
    label?: Identifier;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitContinueStatement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ReturnStatement
})
export class ReturnStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ReturnStatement;
    @PlainPro({
        isClass: true
    })
    expression?: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitReturnStatement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.WithStatement
})
export class WithStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.WithStatement;
    @PlainPro({
        isClass: true
    })
    expression: Expression;
    @PlainPro({
        isClass: true
    })
    statement: Statement;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitWithStatement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.LabeledStatement
})
export class LabeledStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.LabeledStatement;
    @PlainPro({
        isClass: true
    })
    label: Identifier;
    @PlainPro({
        isClass: true
    })
    statement: Statement;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitLabeledStatement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.CaseBlock
})
export class CaseBlock extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.CaseBlock;
    @PlainPro({
        isClass: true
    })
    clauses: CaseOrDefaultClause;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitCaseBlock(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.SwitchStatement
})
export class SwitchStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.SwitchStatement;
    @PlainPro({
        isClass: true
    })
    expression: Expression;
    @PlainPro({
        isClass: true
    })
    caseBlock: CaseBlock;
    @PlainPro({
        isClass: true
    })
    possiblyExhaustive?: boolean;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitSwitchStatement(this, context)
    }
}

@Plain({
    desc: ts.SyntaxKind.ThrowStatement
})
export class ThrowStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ThrowStatement;
    @PlainPro({
        isClass: true
    })
    expression?: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitThrowStatement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.CatchClause
})
export class CatchClause extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.CatchClause;
    @PlainPro({
        isClass: true
    })
    variableDeclaration?: VariableDeclaration;
    @PlainPro({
        isClass: true
    })
    block: Block;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitCatchClause(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.TryStatement
})
export class TryStatement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.TryStatement;
    @PlainPro({
        isClass: true
    })
    tryBlock: Block;
    @PlainPro({
        isClass: true
    })
    catchClause?: CatchClause;
    @PlainPro({
        isClass: true
    })
    finallyBlock?: Block;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitTryStatement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ImportClause
})
export class ImportClause extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ImportClause;
    @PlainPro({
        isClass: true
    })
    name?: Identifier;
    @PlainPro({
        isClass: true
    })
    namedBindings?: NamedImportBindings;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitImportClause(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ImportDeclaration
})
export class ImportDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ImportDeclaration;
    @PlainPro({
        isClass: true
    })
    importClause?: ImportClause;
    @PlainPro({
        isClass: true
    })
    moduleSpecifier: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitImportDeclaration(this, context)
    }
}

@Plain({
    desc: ts.SyntaxKind.ModuleBlock
})
export class ModuleBlock extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ModuleBlock;
    @PlainPro({
        isClass: true
    })
    statements: Statement[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitModuleBlock(this, context)
    }
}
@Plain()
export class JSDocNamespaceDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro({
        isClass: true
    })
    name: Identifier;
    @PlainPro({
        isClass: true
    })
    body?: JSDocNamespaceBody;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJSDocNamespaceDeclaration(this, context)
    }
}

@Plain({
    desc: ts.SyntaxKind.JsxSpreadAttribute
})
export class JsxSpreadAttribute extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.JsxSpreadAttribute;
    @PlainPro({
        isClass: true
    })
    expression: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJsxSpreadAttribute(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.StringLiteral
})
export class StringLiteral extends Node {
    toJson(visitor: Visitor, context?: any) {
        return {
            kind: this.kind,
            text: this.text,
            isUnterminated: this.isUnterminated,
            hasExtendedUnicodeEscape: this.hasExtendedUnicodeEscape
        }
    }
    @PlainPro()
    kind: ts.SyntaxKind.StringLiteral;
    @PlainPro()
    text: string;
    @PlainPro()
    isUnterminated?: boolean;
    @PlainPro()
    hasExtendedUnicodeEscape?: boolean;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitStringLiteral(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JsxAttribute
})
export class JsxAttribute extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    kind: ts.SyntaxKind.JsxAttribute;
    @PlainPro({
        isClass: true
    })
    name: Identifier;
    @PlainPro({
        isClass: true
    })
    initializer?: StringLiteral | JsxExpression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJsxAttribute(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ObjectLiteralExpression
})
export class ObjectLiteralExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    kind: ts.SyntaxKind.ObjectLiteralExpression;
    @PlainPro({
        isClass: true
    })
    properties: ObjectLiteralElementLike[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitObjectLiteralExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JsxAttributes
})
export class JsxAttributes extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    kind: ts.SyntaxKind.JsxAttributes;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJsxAttributes(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JsxOpeningFragment
})
export class JsxOpeningFragment extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    kind: ts.SyntaxKind.JsxOpeningFragment;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJsxOpeningFragment(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JsxClosingFragment
})
export class JsxClosingFragment extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.JsxClosingFragment;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJsxClosingFragment(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JsxFragment
})
export class JsxFragment extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.JsxFragment;
    @PlainPro({
        isClass: true
    })
    openingFragment: JsxOpeningFragment;
    @PlainPro({
        isClass: true
    })
    children: JsxChild[];
    @PlainPro({
        isClass: true
    })
    closingFragment: JsxClosingFragment;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJsxFragment(this, context)
    }
}

@Plain({
    desc: ts.SyntaxKind.JsxSelfClosingElement
})
export class JsxSelfClosingElement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.JsxSelfClosingElement;
    @PlainPro({
        isClass: true
    })
    tagName: JsxTagNameExpression;
    @PlainPro({
        isClass: true
    })
    typeArguments?: TypeNode[];
    @PlainPro({
        isClass: true
    })
    attributes: JsxAttributes;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJsxSelfClosingElement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JsxOpeningElement
})
export class JsxOpeningElement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.JsxOpeningElement;
    @PlainPro({ isClass: true })
    tagName: JsxTagNameExpression;
    @PlainPro({ isClass: true })
    typeArguments?: TypeNode[];
    @PlainPro({ isClass: true })
    attributes: JsxAttributes;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJsxOpeningElement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JsxClosingElement
})
export class JsxClosingElement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.JsxClosingElement;
    @PlainPro({
        isClass: true
    })
    tagName: JsxTagNameExpression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJsxClosingElement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JsxElement
})
export class JsxElement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.JsxElement;
    @PlainPro({
        isClass: true
    })
    openingElement: JsxOpeningElement;
    @PlainPro({
        isClass: true
    })
    children: JsxChild[];
    @PlainPro({
        isClass: true
    })
    closingElement: JsxClosingElement;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJsxElement(this, context)
    }
}

@Plain({
    desc: ts.SyntaxKind.MetaProperty
})
export class MetaProperty extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.MetaProperty;
    @PlainPro()
    keywordToken: ts.SyntaxKind.NewKeyword | ts.SyntaxKind.ImportKeyword;
    @PlainPro({ isClass: true })
    name: Identifier;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitMetaProperty(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ArrayLiteralExpression
})
export class ArrayLiteralExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ArrayLiteralExpression;
    @PlainPro({ isClass: true })
    elements: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitArrayLiteralExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ParenthesizedExpression
})
export class ParenthesizedExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ParenthesizedExpression;
    @PlainPro({ isClass: true })
    expression: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitParenthesizedExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.TemplateHead
})
export class TemplateHead extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    kind: ts.SyntaxKind.TemplateHead;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitTemplateHead(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.TemplateExpression
})
export class TemplateExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.TemplateExpression;
    @PlainPro({ isClass: true })
    head: TemplateHead;
    @PlainPro({ isClass: true })
    templateSpans: TemplateSpan[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitTemplateExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.TemplateSpan
})
export class TemplateSpan extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.TemplateSpan;
    @PlainPro({ isClass: true })
    expression: Expression;
    @PlainPro({ isClass: true })
    literal: TemplateMiddle | TemplateTail;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitTemplateSpan(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.TemplateMiddle
})
export class TemplateMiddle extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    rawText?: string;
    @PlainPro()
    kind: ts.SyntaxKind.TemplateMiddle;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitTemplateMiddle(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.FunctionExpression
})
export class FunctionExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.FunctionExpression;
    @PlainPro({ isClass: true })
    name?: Identifier;
    @PlainPro({ isClass: true })
    body: FunctionBody;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitFunctionExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.TemplateTail
})
export class TemplateTail extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.TemplateTail;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitTemplateTail(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ThisKeyword
})
export class ThisExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ThisKeyword;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitThisExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.SuperKeyword
})
export class SuperExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.SuperKeyword;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitSuperExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ImportKeyword
})
export class ImportExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ImportKeyword;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitImportExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.NullKeyword
})
export class NullLiteral extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.NullKeyword;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitNullLiteral(this, context)
    }
}
@Plain({
    desc: [ts.SyntaxKind.TrueKeyword, ts.SyntaxKind.FalseKeyword]
})
export class BooleanLiteral extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.TrueKeyword | ts.SyntaxKind.FalseKeyword;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitBooleanLiteral(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.PartiallyEmittedExpression
})
export class PartiallyEmittedExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.PartiallyEmittedExpression;
    @PlainPro({ isClass: true })
    expression: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitPartiallyEmittedExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.NonNullExpression
})
export class NonNullExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.NonNullExpression;
    @PlainPro({ isClass: true })
    expression: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitNonNullExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.PostfixUnaryExpression
})
export class PostfixUnaryExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.PostfixUnaryExpression;
    @PlainPro({ isClass: true })
    operand: LeftHandSideExpression;
    @PlainPro({ isClass: true })
    operator: ts.PostfixUnaryOperator;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitPostfixUnaryExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.PrefixUnaryExpression
})
export class PrefixUnaryExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.PrefixUnaryExpression;
    @PlainPro()
    operator: ts.PrefixUnaryOperator;
    @PlainPro({ isClass: true })
    operand: UnaryExpression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitPrefixUnaryExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.DeleteExpression
})
export class DeleteExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.DeleteExpression;
    @PlainPro({ isClass: true })
    expression: UnaryExpression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitDeleteExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.TypeOfExpression
})
export class TypeOfExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.TypeOfExpression;
    @PlainPro({ isClass: true })
    expression: UnaryExpression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitTypeOfExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.VoidExpression
})
export class VoidExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.VoidExpression;
    @PlainPro({ isClass: true })
    expression: UnaryExpression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitVoidExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.AwaitExpression
})
export class AwaitExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.AwaitExpression;
    @PlainPro({ isClass: true })
    expression: UnaryExpression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitAwaitExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.TypeAssertionExpression
})
export class TypeAssertion extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.TypeAssertionExpression;
    @PlainPro({ isClass: true })
    type: TypeNode;
    @PlainPro({ isClass: true })
    expression: UnaryExpression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitTypeAssertion(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.CommaListExpression
})
export class CommaListExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.CommaListExpression;
    @PlainPro({ isClass: true })
    elements: Expression[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitCommaListExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.JsxExpression
})
export class JsxExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.JsxExpression;
    @PlainPro()
    dotDotDotToken?: ts.Token<ts.SyntaxKind.DotDotDotToken>;
    @PlainPro({ isClass: true })
    expression?: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitJsxExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.AsExpression
})
export class AsExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.AsExpression;
    @PlainPro({ isClass: true })
    expression: Expression;
    @PlainPro({ isClass: true })
    type: TypeNode;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitAsExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.CallExpression
})
export class CallExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.CallExpression;
    @PlainPro({ isClass: true })
    expression: LeftHandSideExpression;
    @PlainPro({ isClass: true })
    questionDotToken?: ts.QuestionDotToken;
    @PlainPro({ isClass: true })
    typeArguments?: TypeNode[];
    @PlainPro({ isClass: true })
    arguments: Expression[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitCallExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.NewExpression
})
export class NewExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.NewExpression;
    @PlainPro({ isClass: true })
    expression: LeftHandSideExpression;
    @PlainPro({ isClass: true })
    typeArguments?: TypeNode[];
    @PlainPro({ isClass: true })
    arguments?: Expression[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitNewExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.SpreadElement
})
export class SpreadElement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.SpreadElement;
    @PlainPro({ isClass: true })
    expression: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitSpreadElement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ConditionalExpression
})
export class ConditionalExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ConditionalExpression;
    @PlainPro({ isClass: true })
    condition: Expression;
    @PlainPro()
    questionToken: ts.QuestionToken;
    @PlainPro({ isClass: true })
    whenTrue: Expression;
    @PlainPro()
    colonToken: ts.ColonToken;
    @PlainPro({ isClass: true })
    whenFalse: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitConditionalExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ElementAccessExpression
})
export class ElementAccessExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ElementAccessExpression;
    @PlainPro({
        isClass: true
    })
    expression: LeftHandSideExpression;
    @PlainPro()
    questionDotToken?: ts.QuestionDotToken;
    @PlainPro({
        isClass: true
    })
    argumentExpression: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitElementAccessExpression(this, context)
    }
}

@Plain({
    desc: ts.SyntaxKind.OmittedExpression
})
export class OmittedExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.OmittedExpression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitOmittedExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.YieldExpression
})
export class YieldExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.YieldExpression;
    @PlainPro()
    asteriskToken?: ts.AsteriskToken;
    @PlainPro({
        isClass: true
    })
    expression?: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitYieldExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.SyntheticExpression
})
export class SyntheticExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.SyntheticExpression;
    @PlainPro()
    isSpread: boolean;
    @PlainPro()
    type: ts.Type;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitSyntheticExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.PropertyAccessExpression
})
export class PropertyAccessExpression extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.PropertyAccessExpression;
    @PlainPro({
        isClass: true
    })
    expression: LeftHandSideExpression;
    @PlainPro()
    questionDotToken?: ts.QuestionDotToken;
    @PlainPro({
        isClass: true
    })
    name: Identifier;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitPropertyAccessExpression(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.BigIntLiteral
})
export class BigIntLiteral extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.BigIntLiteral;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitBigIntLiteral(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.NumericLiteral
})
export class NumericLiteral extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.NumericLiteral;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitNumericLiteral(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.ClassDeclaration
})
export class ClassDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ClassDeclaration
    @PlainPro({
        isClass: true
    })
    name?: Identifier;
    @PlainPro({
        isClass: true
    })
    typeParameters?: TypeParameterDeclaration[];
    @PlainPro({
        isClass: true
    })
    heritageClauses?: HeritageClause[];
    @PlainPro({
        isClass: true
    })
    members: ClassElement[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitClassDeclaration(this, context)
    }
}


@Plain({
    desc: ts.SyntaxKind.PropertyDeclaration
})
export class PropertyDeclaration extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.PropertyDeclaration;
    @PlainPro({
        isClass: true
    })
    name: PropertyName;
    @PlainPro()
    questionToken?: ts.QuestionToken;
    @PlainPro()
    exclamationToken?: ts.ExclamationToken;
    @PlainPro({
        isClass: true
    })
    type?: TypeNode;
    @PlainPro({
        isClass: true
    })
    initializer?: Expression;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitPropertyDeclaration(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.SemicolonClassElement
})
export class SemicolonClassElement extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.SemicolonClassElement;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitSemicolonClassElement(this, context)
    }
}
@Plain({
    desc: ts.SyntaxKind.HeritageClause
})
export class HeritageClause extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.HeritageClause;
    @PlainPro()
    token: ts.SyntaxKind.ExtendsKeyword | ts.SyntaxKind.ImplementsKeyword;
    @PlainPro({ isClass: true })
    types: ExpressionWithTypeArguments[];
    visit(visitor: Visitor, context?: any) {
        return visitor.visitHeritageClause(this, context)
    }
}

@Plain({
    desc: ts.SyntaxKind.ExportAssignment
})
export class ExportAssignment extends Node {
    toJson(visitor: Visitor, context?: any) {
        throw new Error("Method not implemented.");
    }
    @PlainPro()
    kind: ts.SyntaxKind.ExportAssignment;
    @PlainPro()
    isExportEquals?: boolean;
    @PlainPro({
        isClass: true
    })
    expression: Expression;
    @PlainPro({
        isClass: true
    })
    name?: Identifier | StringLiteral | NumericLiteral;
    visit(visitor: Visitor, context?: any) {
        return visitor.visitExportAssignment(this, context)
    }
}
export type Declaration = NamedDeclaration;
export type NamedDeclaration = DeclarationStatement;
export type DeclarationStatement = FunctionDeclaration | MethodDeclaration | PropertyDeclaration;
@Plain({
    desc: 999
})
export class Symbol {
    @PlainPro()
    kind: 999 = 999;
    @PlainPro()
    flags: ts.SymbolFlags;
    @PlainPro()
    id: number;
    @PlainPro()
    escapedName: string;
    @PlainPro({ isClass: true })
    declarations: Declaration[];
    @PlainPro({ isClass: true })
    valueDeclaration: Declaration;
    @PlainPro()
    members?: ts.SymbolTable;
    @PlainPro()
    exports?: ts.SymbolTable;
    @PlainPro()
    globalExports?: ts.SymbolTable;
    @PlainPro()
    checkFlags: number;
    @PlainPro({
        isClass: true
    })
    exportSymbol: Symbol;
    @PlainPro()
    name: string;
}
// visit\(visitor: Visitor, context\?: any\) \{ \}
export interface Visitor {
    visitJSDocThisTag(node: JSDocThisTag, context?: any): any;
    visitJSDocTypeTag(node: JSDocTypeTag, context?: any): any;
    visitJSDocUnknownTag(node: JSDocUnknownTag, context?: any): any;
    visitJSDocAugmentsTag(node: JSDocAugmentsTag, context?: any): any;
    visitJSDocAuthorTag(node: JSDocAuthorTag, context?: any): any;
    visitJSDocClassTag(node: JSDocClassTag, context?: any): any;
    visitJSDocEnumTag(node: JSDocEnumTag, context?: any): any;
    visitParenthesizedTypeNode(node: ParenthesizedTypeNode, context?: any): any;
    visitSetAccessorDeclaration(node: SetAccessorDeclaration, context?: any): any;
    visitMethodDeclaration(node: MethodDeclaration, context?: any): any;
    visitTaggedTemplateExpression(node: TaggedTemplateExpression, context?: any): any;
    visitJsxText(node: JsxText, context?: any): any;
    visitSpreadAssignment(node: SpreadAssignment, context?: any): any;
    visitPropertyAssignment(node: PropertyAssignment, context?: any): any;
    visitShorthandPropertyAssignment(node: ShorthandPropertyAssignment, context?: any): any;
    visitEmptyStatement(node: EmptyStatement, context?: any): any;
    visitJsxTagNamePropertyAccess(node: JsxTagNamePropertyAccess, context?: any): any;
    visitIfStatement(node: IfStatement, context?: any): any;
    visitDebuggerStatement(node: DebuggerStatement, context?: any): any;
    visitNotEmittedStatement(node: NotEmittedStatement, context?: any): any;
    visitDefaultClause(node: DefaultClause, context?: any): any;
    visitNamespaceDeclaration(node: NamespaceDeclaration, context?: any): any;
    visitNamedImports(node: NamedImports, context?: any): any;
    visitImportSpecifier(node: ImportSpecifier, context?: any): any;
    visitNamespaceImport(node: NamespaceImport, context?: any): any;
    visitCaseClause(node: CaseClause, context?: any): any;
    visitComputedPropertyName(node: ComputedPropertyName, context?: any): any;
    visitObjectBindingPattern(node: ObjectBindingPattern, context?: any): any;
    visitArrayBindingPattern(node: ArrayBindingPattern, context?: any): any;
    visitParameterDeclaration(node: ParameterDeclaration, context?: any): any;
    visitBindingElement(node: BindingElement, context?: any): any;
    visitVariableDeclarationList(node: VariableDeclarationList, context?: any): any;
    visitVariableStatement(node: VariableStatement, context?: any): any;
    visitVariableDeclaration(node: VariableDeclaration, context?: any): any;
    visitDoStatement(node: DoStatement, context?: any): any;
    visitWhileStatement(node: WhileStatement, context?: any): any;
    visitForStatement(node: ForStatement, context?: any): any;
    visitForInStatement(node: ForInStatement, context?: any): any;
    visitForOfStatement(node: ForOfStatement, context?: any): any;
    visitBreakStatement(node: BreakStatement, context?: any): any;
    visitContinueStatement(node: ContinueStatement, context?: any): any;
    visitReturnStatement(node: ReturnStatement, context?: any): any;
    visitWithStatement(node: WithStatement, context?: any): any;
    visitLabeledStatement(node: LabeledStatement, context?: any): any;
    visitCaseBlock(node: CaseBlock, context?: any): any;
    visitSwitchStatement(node: SwitchStatement, context?: any): any;
    visitThrowStatement(node: ThrowStatement, context?: any): any;
    visitCatchClause(node: CatchClause, context?: any): any;
    visitTryStatement(node: TryStatement, context?: any): any;
    visitImportClause(node: ImportClause, context?: any): any;
    visitImportDeclaration(node: ImportDeclaration, context?: any): any;
    visitModuleBlock(node: ModuleBlock, context?: any): any;
    visitJSDocNamespaceDeclaration(node: JSDocNamespaceDeclaration, context?: any): any;
    visitJsxSpreadAttribute(node: JsxSpreadAttribute, context?: any): any;
    visitStringLiteral(node: StringLiteral, context?: any): any;
    visitJsxAttribute(node: JsxAttribute, context?: any): any;
    visitObjectLiteralExpression(node: ObjectLiteralExpression, context?: any): any;
    visitJsxAttributes(node: JsxAttributes, context?: any): any;
    visitJsxOpeningFragment(node: JsxOpeningFragment, context?: any): any;
    visitJsxClosingFragment(node: JsxClosingFragment, context?: any): any;
    visitJsxFragment(node: JsxFragment, context?: any): any;
    visitJsxSelfClosingElement(node: JsxSelfClosingElement, context?: any): any;
    visitJsxOpeningElement(node: JsxOpeningElement, context?: any): any;
    visitJsxClosingElement(node: JsxClosingElement, context?: any): any;
    visitJsxElement(node: JsxElement, context?: any): any;
    visitMetaProperty(node: MetaProperty, context?: any): any;
    visitArrayLiteralExpression(node: ArrayLiteralExpression, context?: any): any;
    visitParenthesizedExpression(node: ParenthesizedExpression, context?: any): any;
    visitTemplateHead(node: TemplateHead, context?: any): any;
    visitTemplateExpression(node: TemplateExpression, context?: any): any;
    visitTemplateSpan(node: TemplateSpan, context?: any): any;
    visitTemplateMiddle(node: TemplateMiddle, context?: any): any;
    visitFunctionExpression(node: FunctionExpression, context?: any): any;
    visitTemplateTail(node: TemplateTail, context?: any): any;
    visitThisExpression(node: ThisExpression, context?: any): any;
    visitSuperExpression(node: SuperExpression, context?: any): any;
    visitImportExpression(node: ImportExpression, context?: any): any;
    visitNullLiteral(node: NullLiteral, context?: any): any;
    visitBooleanLiteral(node: BooleanLiteral, context?: any): any;
    visitPartiallyEmittedExpression(node: PartiallyEmittedExpression, context?: any): any;
    visitNonNullExpression(node: NonNullExpression, context?: any): any;
    visitPostfixUnaryExpression(node: PostfixUnaryExpression, context?: any): any;
    visitPrefixUnaryExpression(node: PrefixUnaryExpression, context?: any): any;
    visitDeleteExpression(node: DeleteExpression, context?: any): any;
    visitTypeOfExpression(node: TypeOfExpression, context?: any): any;
    visitVoidExpression(node: VoidExpression, context?: any): any;
    visitAwaitExpression(node: AwaitExpression, context?: any): any;
    visitTypeAssertion(node: TypeAssertion, context?: any): any;
    visitCommaListExpression(node: CommaListExpression, context?: any): any;
    visitJsxExpression(node: JsxExpression, context?: any): any;
    visitAsExpression(node: AsExpression, context?: any): any;
    visitNewExpression(node: NewExpression, context?: any): any;
    visitSpreadElement(node: SpreadElement, context?: any): any;
    visitConditionalExpression(node: ConditionalExpression, context?: any): any;
    visitElementAccessExpression(node: ElementAccessExpression, context?: any): any;
    visitOmittedExpression(node: OmittedExpression, context?: any): any;
    visitYieldExpression(node: YieldExpression, context?: any): any;
    visitSyntheticExpression(node: SyntheticExpression, context?: any): any;
    visitPropertyAccessExpression(node: PropertyAccessExpression, context?: any): any;
    visitBigIntLiteral(node: BigIntLiteral, context?: any): any;
    visitNumericLiteral(node: NumericLiteral, context?: any): any;
    visitSemicolonClassElement(node: SemicolonClassElement, context?: any): any;
    visitHeritageClause(node: HeritageClause, context?: any): any;
    visitExpressionWithTypeArguments(node: ExpressionWithTypeArguments, context?: any): any;
    visitJSDocVariadicType(node: JSDocVariadicType, context?: any): any;
    visitJSDocNonNullableType(node: JSDocNonNullableType, context?: any): any;
    visitJSDocNullableType(node: JSDocNullableType, context?: any): any;
    visitTypeOperatorNode(node: TypeOperatorNode, context?: any): any;
    visitTypeParameterDeclaration(node: TypeParameterDeclaration, context?: any): any;
    visitMappedTypeNode(node: MappedTypeNode, context?: any): any;
    visitTypePredicateNode(node: TypePredicateNode, context?: any): any;
    visitThisTypeNode(node: ThisTypeNode, context?: any): any;
    visitExternalModuleReference(node: ExternalModuleReference, context?: any): any;
    visitNamedExports(node: NamedExports, context?: any): any;
    visitExportDeclaration(node: ExportDeclaration, context?: any): any;
    visitExportSpecifier(node: ExportSpecifier, context?: any): any;
    visitEndOfFileToken(node: EndOfFileToken, context?: any): any;
    visitEnumMember(node: EnumMember, context?: any): any;
    visitModuleDeclaration(node: ModuleDeclaration, context?: any): any;
    visitImportEqualsDeclaration(node: ImportEqualsDeclaration, context?: any): any;
    visitFunctionDeclaration(node: FunctionDeclaration, context?: any): any;
    visitJSDocFunctionType(node: JSDocFunctionType, context?: any): any;
    visitFunctionTypeNode(node: FunctionTypeNode, context?: any): any;
    visitConstructorTypeNode(node: ConstructorTypeNode, context: any): any;
    visitIndexSignatureDeclaration(node: IndexSignatureDeclaration, context?: any): any;
    visitMethodSignature(node: MethodSignature, context?: any): any;
    visitConstructSignatureDeclaration(node: ConstructSignatureDeclaration, context?: any): any;
    visitCallSignatureDeclaration(node: CallSignatureDeclaration, context?: any): any;
    visitArrowFunction(node: ArrowFunction, context?: any): any;
    visitTypeAliasDeclaration(node: TypeAliasDeclaration, context?: any): any;
    visitEnumDeclaration(node: EnumDeclaration, context?: any): any;
    visitPropertyAccessEntityNameExpression(node: PropertyAccessEntityNameExpression, context?: any): any;
    visitJSDocSignature(node: JSDocSignature, context?: any): any;
    visitJSDocCallbackTag(node: JSDocCallbackTag, context?: any): any;
    visitJSDocTypeExpression(node: JSDocTypeExpression, context?: any): any;
    visitJSDocTemplateTag(node: JSDocTemplateTag, context?: any): any;
    visitJSDocParameterTag(node: JSDocParameterTag, context?: any): any;
    visitJSDocReturnTag(node: JSDocReturnTag, context?: any): any;
    visitClassExpression(node: ClassExpression, context?: any): any;
    visitDecorator(node: Decorator, context?: any): any;
    visitJSDoc(node: JSDoc, context?: any): any;
    visitJSDocTypeLiteral(node: JSDocTypeLiteral, context?: any): any;
    visitJSDocPropertyTag(node: JSDocPropertyTag, context?: any): any;
    visitJSDocTypedefTag(node: JSDocTypedefTag, context?: any): any;
    visitTypeLiteralNode(node: TypeLiteralNode, context?: any): any;
    visitPropertySignature(node: PropertySignature, context?: any): any;
    visitInterfaceDeclaration(node: InterfaceDeclaration, context?: any): any;
    visitNoSubstitutionTemplateLiteral(node: NoSubstitutionTemplateLiteral, context?: any): any;
    visitGetAccessorDeclaration(node: GetAccessorDeclaration, context?: any): any;
    visit(node?: Node, context?: any): any;
    visits(nodes?: Node[], context?: any): any;
    visitSourceFile(node: SourceFile, context?: any): any;
    visitClassDeclaration(node: ClassDeclaration, context?: any): any;
    visitPropertyDeclaration(node: PropertyDeclaration, context?: any): any;
    visitTypeReferenceNode(node: TypeReferenceNode, context?: any): any;
    visitQualifiedName(node: QualifiedName, context?: any): any;
    visitIdentifier(node: Identifier, context?: any): any;
    visitKeywordTypeNode(node: KeywordTypeNode, context?: any): any;
    visitConstructorDeclaration(node: ConstructorDeclaration, context?: any): any;
    visitExpressionStatement(node: ExpressionStatement, context?: any): any;
    visitCallExpression(node: CallExpression, context?: any): any;
    visitBlock(node: Block, context?: any): any;
    visitJSDocOptionalType(node: JSDocOptionalType, context?: any): any;
    visitExportAssignment(node: ExportAssignment, context?: any): any;
}
