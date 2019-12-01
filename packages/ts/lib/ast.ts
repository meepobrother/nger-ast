import * as ts from 'typescript';
import { Plain, PlainPro } from '@nger/plain';
export abstract class TypeNode {
    node: ts.Node;
    abstract visit(visitor: Visitor, context?: any): any;
}
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
export class TypeReferenceNode {
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
}
@Plain({
    desc: ts.SyntaxKind.Block
})
export class Block {
    kind: ts.SyntaxKind.Block;
    @PlainPro({
        isClass: true
    })
    statements: Statement;
}
@Plain({
    desc: ts.SyntaxKind.Identifier
})
export class Identifier {
    @PlainPro()
    kind: ts.SyntaxKind.Identifier;
    @PlainPro()
    escapedText: ts.__String;
    @PlainPro()
    originalKeywordKind?: ts.SyntaxKind;
    @PlainPro()
    isInJSDocNamespace: boolean;
}
@Plain({
    desc: ts.SyntaxKind.JSDocOptionalType
})
export class JSDocOptionalType {
    @PlainPro()
    kind: ts.SyntaxKind.JSDocOptionalType;
    @PlainPro({
        isClass: true
    })
    type: TypeNode;
}
@Plain({
    desc: ts.SyntaxKind.JSDocVariadicType
})
export class JSDocVariadicType {
    @PlainPro()
    kind: ts.SyntaxKind.JSDocVariadicType;
    @PlainPro({
        isClass: true
    })
    type: TypeNode;
}
@Plain({
    desc: ts.SyntaxKind.JSDocNonNullableType
})
export class JSDocNonNullableType {
    @PlainPro()
    kind: ts.SyntaxKind.JSDocNonNullableType;
    @PlainPro({
        isClass: true
    })
    type: TypeNode;
}
@Plain({
    desc: ts.SyntaxKind.JSDocNullableType
})
export class JSDocNullableType {
    @PlainPro()
    kind: ts.SyntaxKind.JSDocNullableType;
    @PlainPro({
        isClass: true
    })
    type: TypeNode;
}
@Plain({
    desc: ts.SyntaxKind.TypeOperator
})
export class TypeOperatorNode {
    @PlainPro()
    kind: ts.SyntaxKind.TypeOperator;
    @PlainPro()
    operator: ts.SyntaxKind.KeyOfKeyword | ts.SyntaxKind.UniqueKeyword | ts.SyntaxKind.ReadonlyKeyword;
    @PlainPro({ isClass: true })
    type: TypeNode;
}
@Plain({
    desc: ts.SyntaxKind.TypeParameter
})
export class TypeParameterDeclaration {
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
}
@Plain({
    desc: ts.SyntaxKind.MappedType
})
export class MappedTypeNode {
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
}
@Plain({
    desc: ts.SyntaxKind.TypePredicate
})
export class TypePredicateNode {
    @PlainPro()
    kind: ts.SyntaxKind.TypePredicate;
    @PlainPro()
    assertsModifier?: ts.AssertsToken;
    @PlainPro({ isClass: true })
    parameterName: Identifier | ThisTypeNode;
    @PlainPro({ isClass: true })
    type?: TypeNode;
}
@Plain({
    desc: ts.SyntaxKind.ThisType
})
export class ThisTypeNode {
    @PlainPro()
    kind: ts.SyntaxKind.ThisType;
}
@Plain({
    desc: ts.SyntaxKind.ParenthesizedType
})
export class ParenthesizedTypeNode {
    @PlainPro()
    kind: ts.SyntaxKind.ParenthesizedType;
    @PlainPro({ isClass: true })
    type: TypeNode;
}
@Plain({
    desc: ts.SyntaxKind.ExternalModuleReference
})
export class ExternalModuleReference {
    @PlainPro()
    kind: ts.SyntaxKind.ExternalModuleReference;
    @PlainPro({ isClass: true })
    expression: Expression;
}
@Plain({
    desc: ts.SyntaxKind.ExportDeclaration
})
export class ExportDeclaration {
    kind: ts.SyntaxKind.ExportDeclaration;
    exportClause?: NamedExports;
    moduleSpecifier?: Expression;
}
@Plain({
    desc: ts.SyntaxKind.NamedExports
})
export class NamedExports {
    @PlainPro()
    kind: ts.SyntaxKind.NamedExports;
    @PlainPro({ isClass: true })
    elements: ExportSpecifier[];
}
@Plain({
    desc: ts.SyntaxKind.ExportSpecifier
})
export class ExportSpecifier {
    @PlainPro()
    kind: ts.SyntaxKind.ExportSpecifier;
    @PlainPro({ isClass: true })
    propertyName?: Identifier;
    @PlainPro({ isClass: true })
    name: Identifier;
}
@Plain({
    desc: ts.SyntaxKind.EndOfFileToken
})
export class EndOfFileToken {
    @PlainPro()
    kind: ts.SyntaxKind.EndOfFileToken;
}
@Plain({
    desc: ts.SyntaxKind.EnumMember
})
export class EnumMember {
    @PlainPro()
    kind: ts.SyntaxKind.EnumMember;
    @PlainPro({ isClass: true })
    name: PropertyName;
    @PlainPro({ isClass: true })
    initializer?: Expression;
}
@Plain({
    desc: ts.SyntaxKind.ModuleDeclaration
})
export class ModuleDeclaration {
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
}
@Plain({
    desc: ts.SyntaxKind.ImportEqualsDeclaration
})
export class ImportEqualsDeclaration {
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
}
@Plain({
    desc: ts.SyntaxKind.SourceFile
})
export class SourceFile {
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
}
@Plain({
    desc: ts.SyntaxKind.Constructor
})
export class ConstructorDeclaration {
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
}
@Plain({
    desc: ts.SyntaxKind.FunctionDeclaration
})
export class FunctionDeclaration {
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
}
@Plain({
    desc: ts.SyntaxKind.JSDocFunctionType
})
export class JSDocFunctionType {
    @PlainPro()
    kind: ts.SyntaxKind.JSDocFunctionType;
}
@Plain({
    desc: ts.SyntaxKind.FunctionType
})
export class FunctionTypeNode {
    @PlainPro()
    kind: ts.SyntaxKind.FunctionType;
}
@Plain({
    desc: ts.SyntaxKind.ConstructorType
})
export class ConstructorTypeNode {
    @PlainPro()
    kind: ts.SyntaxKind.ConstructorType;
}
@Plain({
    desc: ts.SyntaxKind.IndexSignature
})
export class IndexSignatureDeclaration {
    @PlainPro()
    kind: ts.SyntaxKind.IndexSignature;
}
@Plain({
    desc: ts.SyntaxKind.MethodSignature
})
export class MethodSignature {
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
}
@Plain({
    desc: ts.SyntaxKind.ConstructSignature
})
export class ConstructSignatureDeclaration {
    @PlainPro()
    kind: ts.SyntaxKind.ConstructSignature;
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
export class KeywordTypeNode {
    @PlainPro()
    kind: ts.SyntaxKind.AnyKeyword | ts.SyntaxKind.UnknownKeyword | ts.SyntaxKind.NumberKeyword | ts.SyntaxKind.BigIntKeyword | ts.SyntaxKind.ObjectKeyword | ts.SyntaxKind.BooleanKeyword | ts.SyntaxKind.StringKeyword | ts.SyntaxKind.SymbolKeyword | ts.SyntaxKind.ThisKeyword | ts.SyntaxKind.VoidKeyword | ts.SyntaxKind.UndefinedKeyword | ts.SyntaxKind.NullKeyword | ts.SyntaxKind.NeverKeyword;
}
@Plain({
    desc: ts.SyntaxKind.CallSignature
})
export class CallSignatureDeclaration {
    @PlainPro()
    kind: ts.SyntaxKind.CallSignature;
}
@Plain({
    desc: ts.SyntaxKind.ArrowFunction
})
export class ArrowFunction {
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
}
@Plain({
    desc: ts.SyntaxKind.TypeAliasDeclaration
})
export class TypeAliasDeclaration {
    @PlainPro()
    kind: ts.SyntaxKind.TypeAliasDeclaration;
    @PlainPro({ isClass: true })
    name: Identifier;
    @PlainPro({ isClass: true })
    typeParameters?: TypeParameterDeclaration[];
    @PlainPro({ isClass: true })
    type: TypeNode;
}
@Plain({
    desc: ts.SyntaxKind.EnumDeclaration
})
export class EnumDeclaration {
    kind: ts.SyntaxKind.EnumDeclaration;
    name: Identifier;
    members: EnumMember[];
}
@Plain({
    desc: ts.SyntaxKind.PropertyAccessExpression
})
export class PropertyAccessEntityNameExpression {
    @PlainPro()
    kind: ts.SyntaxKind.PropertyAccessExpression;
    @PlainPro()
    questionDotToken?: ts.QuestionDotToken;
    @PlainPro({ isClass: true })
    name: Identifier;
    @PlainPro({ isClass: true })
    expression: EntityNameExpression;
}
@Plain({
    desc: ts.SyntaxKind.JSDocSignature
})
export class JSDocSignature {
    @PlainPro()
    kind: ts.SyntaxKind.JSDocSignature;
    @PlainPro({ isClass: true })
    typeParameters?: JSDocTemplateTag[];
    @PlainPro({ isClass: true })
    parameters: JSDocParameterTag[];
    @PlainPro({ isClass: true })
    type: JSDocReturnTag | undefined;
}
@Plain({
    desc: ts.SyntaxKind.JSDocCallbackTag
})
export class JSDocCallbackTag {
    @PlainPro()
    kind: ts.SyntaxKind.JSDocCallbackTag;
    @PlainPro({ isClass: true })
    fullName?: JSDocNamespaceDeclaration | Identifier;
    @PlainPro({ isClass: true })
    name?: Identifier;
    @PlainPro({ isClass: true })
    typeExpression: JSDocSignature;
}
@Plain({
    desc: ts.SyntaxKind.JSDocTypeExpression
})
export class JSDocTypeExpression {
    @PlainPro()
    kind: ts.SyntaxKind.JSDocTypeExpression;
    @PlainPro({
        isClass: true
    })
    type: TypeNode;
}
@Plain({
    desc: ts.SyntaxKind.JSDocTemplateTag
})
export class JSDocTemplateTag {
    @PlainPro()
    kind: ts.SyntaxKind.JSDocTemplateTag;
    @PlainPro({ isClass: true })
    constraint: JSDocTypeExpression | undefined;
    @PlainPro({ isClass: true })
    typeParameters: TypeParameterDeclaration[];
}

@Plain({
    desc: ts.SyntaxKind.JSDocParameterTag
})
export class JSDocParameterTag {
    @PlainPro()
    kind: ts.SyntaxKind.JSDocParameterTag;
}
@Plain({
    desc: ts.SyntaxKind.JSDocReturnTag
})
export class JSDocReturnTag {
    @PlainPro()
    kind: ts.SyntaxKind.JSDocReturnTag;
    @PlainPro({ isClass: true })
    typeExpression?: JSDocTypeExpression;
}
@Plain({
    desc: ts.SyntaxKind.ClassExpression
})
export class ClassExpression {
    @PlainPro()
    kind: ts.SyntaxKind.ClassExpression;
}
@Plain({
    desc: ts.SyntaxKind.Decorator
})
export class Decorator {
    @PlainPro()
    kind: ts.SyntaxKind.Decorator;
    @PlainPro({ isClass: true })
    expression: LeftHandSideExpression;
}
@Plain({
    desc: ts.SyntaxKind.QualifiedName
})
export class QualifiedName {
    @PlainPro()
    kind: ts.SyntaxKind.QualifiedName;
    @PlainPro({ isClass: true })
    left: EntityName;
    @PlainPro({ isClass: true })
    right: Identifier;
    @PlainPro({ isClass: true })
    decorators?: Decorator;
    @PlainPro({ isClass: true })
    modifiers?: Modifier[];
}
@Plain({
    desc: ts.SyntaxKind.JSDocComment
})
export class JSDoc {
    @PlainPro()
    kind: ts.SyntaxKind.JSDocComment;
    @PlainPro({ isClass: true })
    tags?: JSDocTag[];
    @PlainPro()
    comment?: string;
}
@Plain()
export class JSDocTag {
    @PlainPro()
    tagName: Identifier;
    @PlainPro()
    comment?: string;
}
@Plain({
    desc: ts.SyntaxKind.JSDocTypeLiteral
})
export class JSDocTypeLiteral {
    @PlainPro()
    kind: ts.SyntaxKind.JSDocTypeLiteral;
    @PlainPro({
        isClass: true
    })
    jsDocPropertyTags?: JSDocPropertyLikeTag[];
    @PlainPro()
    isArrayType?: boolean;
}

@Plain()
export class JSDocPropertyLikeTag {
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
}

@Plain({
    desc: ts.SyntaxKind.JSDocTypedefTag
})
export class JSDocTypedefTag {
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
}
@Plain({
    desc: ts.SyntaxKind.TypeLiteral
})
export class TypeLiteralNode {
    @PlainPro()
    kind: ts.SyntaxKind.TypeLiteral;
    @PlainPro({
        isClass: true
    })
    members: TypeElement;
}
@Plain({
    desc: ts.SyntaxKind.PropertySignature
})
export class PropertySignature {
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
}
@Plain({
    desc: ts.SyntaxKind.InterfaceDeclaration
})
export class InterfaceDeclaration {
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
}
export class NoSubstitutionTemplateLiteral {
    kind: ts.SyntaxKind.NoSubstitutionTemplateLiteral;
}
export class GetAccessorDeclaration {
    kind: ts.SyntaxKind.GetAccessor;
    name: PropertyName;
    body?: FunctionBody;
}
export interface SetAccessorDeclaration {
    kind: ts.SyntaxKind.SetAccessor;
    name: PropertyName;
    body?: FunctionBody;
}
@Plain({
    desc: ts.SyntaxKind.MethodDeclaration
})
export class MethodDeclaration {
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
}
export class TaggedTemplateExpression {
    kind: ts.SyntaxKind.TaggedTemplateExpression;
    tag: LeftHandSideExpression;
    typeArguments?: TypeNode[];
    template: TemplateLiteral;
}
export class JsxText {
    kind: ts.SyntaxKind.JsxText;
    containsOnlyTriviaWhiteSpaces: boolean;
}
export class SpreadAssignment {
    kind: ts.SyntaxKind.SpreadAssignment;
    expression: Expression;
}
export class PropertyAssignment {
    kind: ts.SyntaxKind.PropertyAssignment;
    name: PropertyName;
    questionToken?: ts.QuestionToken;
    initializer: Expression;
}
export class ShorthandPropertyAssignment {
    kind: ts.SyntaxKind.ShorthandPropertyAssignment;
    name: Identifier;
    questionToken?: ts.QuestionToken;
    exclamationToken?: ts.ExclamationToken;
    equalsToken?: ts.Token<ts.SyntaxKind.EqualsToken>;
    objectAssignmentInitializer?: Expression;
}
export class EmptyStatement {
    kind: ts.SyntaxKind.EmptyStatement;
}
export class JsxTagNamePropertyAccess {
    kind: ts.SyntaxKind.PropertyAccessExpression;
    questionDotToken?: ts.QuestionDotToken;
    name: Identifier;
    expression: JsxTagNameExpression;
}
export class IfStatement {
    kind: ts.SyntaxKind.IfStatement;
    expression: Expression;
    thenStatement: Statement;
    elseStatement?: Statement;
}
export class ExpressionStatement {
    kind: ts.SyntaxKind.ExpressionStatement;
    expression: Expression;
}
export class DebuggerStatement {
    kind: ts.SyntaxKind.DebuggerStatement;
}
export class NotEmittedStatement {
    kind: ts.SyntaxKind.NotEmittedStatement;
}
@Plain({
    desc: ts.SyntaxKind.DefaultClause
})
export class DefaultClause {
    @PlainPro()
    kind: ts.SyntaxKind.DefaultClause;
    @PlainPro({
        isClass: true
    })
    statements: Statement;
}
@Plain({
    desc: ts.SyntaxKind.ModuleDeclaration
})
export class NamespaceDeclaration {
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
}
@Plain({
    desc: ts.SyntaxKind.NamedImports
})
export class NamedImports {
    @PlainPro()
    kind: ts.SyntaxKind.NamedImports;
    @PlainPro({
        isClass: true
    })
    elements: ImportSpecifier[];
}
@Plain({
    desc: ts.SyntaxKind.ImportSpecifier
})
export class ImportSpecifier {
    @PlainPro()
    kind: ts.SyntaxKind.ImportSpecifier;
    @PlainPro({ isClass: true })
    propertyName?: Identifier;
    @PlainPro({ isClass: true })
    name: Identifier;
}
@Plain({
    desc: ts.SyntaxKind.NamespaceImport
})
export class NamespaceImport {
    @PlainPro()
    kind: ts.SyntaxKind.NamespaceImport;
    @PlainPro({ isClass: true })
    name: Identifier;
}
@Plain({
    desc: ts.SyntaxKind.CaseClause
})
export class CaseClause {
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
}
@Plain({
    desc: ts.SyntaxKind.ComputedPropertyName
})
export class ComputedPropertyName {
    @PlainPro()
    kind: ts.SyntaxKind.ComputedPropertyName;
    @PlainPro({ isClass: true })
    expression: Expression;
}
@Plain({
    desc: ts.SyntaxKind.ObjectBindingPattern
})
export class ObjectBindingPattern {
    @PlainPro()
    kind: ts.SyntaxKind.ObjectBindingPattern;
    @PlainPro({
        isClass: true
    })
    elements: BindingElement[];
}
@Plain({
    desc: ts.SyntaxKind.ArrayBindingPattern
})
export class ArrayBindingPattern {
    @PlainPro()
    kind: ts.SyntaxKind.ArrayBindingPattern;
    @PlainPro({
        isClass: true
    })
    elements: ArrayBindingElement[];
}
@Plain({
    desc: ts.SyntaxKind.Parameter
})
export class ParameterDeclaration {
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
}
@Plain({
    desc: ts.SyntaxKind.BindingElement
})
export class BindingElement {
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
}
@Plain({
    desc: ts.SyntaxKind.VariableDeclarationList
})
export class VariableDeclarationList {
    kind: ts.SyntaxKind.VariableDeclarationList;
    @PlainPro({
        isClass: true
    })
    declarations: VariableDeclaration[];
}
@Plain({
    desc: ts.SyntaxKind.VariableStatement
})
export class VariableStatement {
    kind: ts.SyntaxKind.VariableStatement;
    @PlainPro({
        isClass: true
    })
    declarationList: VariableDeclarationList;
}
@Plain({
    desc: ts.SyntaxKind.VariableDeclaration
})
export class VariableDeclaration {
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
}
@Plain({
    desc: ts.SyntaxKind.DoStatement
})
export class DoStatement {
    kind: ts.SyntaxKind.DoStatement;
    @PlainPro({
        isClass: true
    })
    expression: Expression;
}
@Plain({
    desc: ts.SyntaxKind.WhileStatement
})
export class WhileStatement {
    kind: ts.SyntaxKind.WhileStatement;
    @PlainPro({
        isClass: true
    })
    expression: Expression;
}
@Plain({
    desc: ts.SyntaxKind.ForStatement
})
export class ForStatement {
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
}
@Plain({
    desc: ts.SyntaxKind.ForInStatement
})
export class ForInStatement {
    kind: ts.SyntaxKind.ForInStatement;
    @PlainPro({
        isClass: true
    })
    initializer: ForInitializer;
    @PlainPro({
        isClass: true
    })
    expression: Expression;
}
@Plain({
    desc: ts.SyntaxKind.ForOfStatement
})
export class ForOfStatement {
    kind: ts.SyntaxKind.ForOfStatement;
    awaitModifier?: ts.AwaitKeywordToken;
    @PlainPro({
        isClass: true
    })
    initializer: ForInitializer;
    @PlainPro({
        isClass: true
    })
    expression: Expression;
}


@Plain({
    desc: ts.SyntaxKind.BreakStatement
})
export class BreakStatement {
    kind: ts.SyntaxKind.BreakStatement;
    @PlainPro({
        isClass: true
    })
    label?: Identifier;
}
@Plain({
    desc: ts.SyntaxKind.ContinueStatement
})
export class ContinueStatement {
    kind: ts.SyntaxKind.ContinueStatement;
    @PlainPro({
        isClass: true
    })
    label?: Identifier;
}
@Plain({
    desc: ts.SyntaxKind.ReturnStatement
})
export class ReturnStatement {
    kind: ts.SyntaxKind.ReturnStatement;
    @PlainPro({
        isClass: true
    })
    expression?: Expression;
}
@Plain({
    desc: ts.SyntaxKind.WithStatement
})
export class WithStatement {
    kind: ts.SyntaxKind.WithStatement;
    @PlainPro({
        isClass: true
    })
    expression: Expression;
    @PlainPro({
        isClass: true
    })
    statement: Statement;
}
@Plain({
    desc: ts.SyntaxKind.LabeledStatement
})
export class LabeledStatement {
    kind: ts.SyntaxKind.LabeledStatement;
    @PlainPro({
        isClass: true
    })
    label: Identifier;
    @PlainPro({
        isClass: true
    })
    statement: Statement;
}
@Plain({
    desc: ts.SyntaxKind.CaseBlock
})
export class CaseBlock {
    kind: ts.SyntaxKind.CaseBlock;
    @PlainPro({
        isClass: true
    })
    clauses: CaseOrDefaultClause;
}
@Plain({
    desc: ts.SyntaxKind.SwitchStatement
})
export class SwitchStatement {
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
}

@Plain({
    desc: ts.SyntaxKind.ThrowStatement
})
export class ThrowStatement {
    kind: ts.SyntaxKind.ThrowStatement;
    @PlainPro({
        isClass: true
    })
    expression?: Expression;
}
@Plain({
    desc: ts.SyntaxKind.CatchClause
})
export class CatchClause {
    kind: ts.SyntaxKind.CatchClause;
    @PlainPro({
        isClass: true
    })
    variableDeclaration?: VariableDeclaration;
    @PlainPro({
        isClass: true
    })
    block: Block;
}
@Plain({
    desc: ts.SyntaxKind.TryStatement
})
export class TryStatement {
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
}
@Plain({
    desc: ts.SyntaxKind.ImportClause
})
export class ImportClause {
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
}
@Plain({
    desc: ts.SyntaxKind.ImportDeclaration
})
export class ImportDeclaration {
    kind: ts.SyntaxKind.ImportDeclaration;
    @PlainPro({
        isClass: true
    })
    importClause?: ImportClause;
    @PlainPro({
        isClass: true
    })
    moduleSpecifier: Expression;
}

@Plain({
    desc: ts.SyntaxKind.ModuleBlock
})
export class ModuleBlock {
    @PlainPro()
    kind: ts.SyntaxKind.ModuleBlock;
    @PlainPro({
        isClass: true
    })
    statements: Statement[];
}
@Plain()
export class JSDocNamespaceDeclaration {
    name: Identifier;
    @PlainPro({
        isClass: true
    })
    body?: JSDocNamespaceBody;
}

@Plain({
    desc: ts.SyntaxKind.JsxSpreadAttribute
})
export class JsxSpreadAttribute {
    kind: ts.SyntaxKind.JsxSpreadAttribute;
    expression: Expression;
}
@Plain({
    desc: ts.SyntaxKind.StringLiteral
})
export class StringLiteral {
    @PlainPro()
    kind: ts.SyntaxKind.StringLiteral;
    @PlainPro()
    text: string;
    @PlainPro()
    isUnterminated?: boolean;
    @PlainPro()
    hasExtendedUnicodeEscape?: boolean;
}
@Plain({
    desc: ts.SyntaxKind.JsxAttribute
})
export class JsxAttribute {
    kind: ts.SyntaxKind.JsxAttribute;
    @PlainPro({
        isClass: true
    })
    name: Identifier;
    @PlainPro({
        isClass: true
    })
    initializer?: StringLiteral | JsxExpression;
}
@Plain({
    desc: ts.SyntaxKind.ObjectLiteralExpression
})
export class ObjectLiteralExpression {
    kind: ts.SyntaxKind.ObjectLiteralExpression;
    @PlainPro({
        isClass: true
    })
    properties: ObjectLiteralElementLike[];
}
@Plain({
    desc: ts.SyntaxKind.JsxAttributes
})
export class JsxAttributes {
    kind: ts.SyntaxKind.JsxAttributes;
}
@Plain({
    desc: ts.SyntaxKind.JsxOpeningFragment
})
export class JsxOpeningFragment {
    kind: ts.SyntaxKind.JsxOpeningFragment;
}
@Plain({
    desc: ts.SyntaxKind.JsxClosingFragment
})
export class JsxClosingFragment {
    @PlainPro()
    kind: ts.SyntaxKind.JsxClosingFragment;
}
@Plain({
    desc: ts.SyntaxKind.JsxFragment
})
export class JsxFragment {
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
}

@Plain({
    desc: ts.SyntaxKind.JsxSelfClosingElement
})
export class JsxSelfClosingElement {
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
}
@Plain({
    desc: ts.SyntaxKind.JsxOpeningElement
})
export class JsxOpeningElement {
    @PlainPro()
    kind: ts.SyntaxKind.JsxOpeningElement;
    @PlainPro({ isClass: true })
    tagName: JsxTagNameExpression;
    @PlainPro({ isClass: true })
    typeArguments?: TypeNode[];
    @PlainPro({ isClass: true })
    attributes: JsxAttributes;
}
@Plain({
    desc: ts.SyntaxKind.JsxClosingElement
})
export class JsxClosingElement {
    kind: ts.SyntaxKind.JsxClosingElement;
    @PlainPro({
        isClass: true
    })
    tagName: JsxTagNameExpression;
}
@Plain({
    desc: ts.SyntaxKind.JsxElement
})
export class JsxElement {
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
}

@Plain({
    desc: ts.SyntaxKind.MetaProperty
})
export class MetaProperty {
    kind: ts.SyntaxKind.MetaProperty;
    keywordToken: ts.SyntaxKind.NewKeyword | ts.SyntaxKind.ImportKeyword;
    @PlainPro({ isClass: true })
    name: Identifier;
}
@Plain({
    desc: ts.SyntaxKind.ArrayLiteralExpression
})
export class ArrayLiteralExpression {
    kind: ts.SyntaxKind.ArrayLiteralExpression;
    @PlainPro({ isClass: true })
    elements: Expression;
}
@Plain({
    desc: ts.SyntaxKind.ParenthesizedExpression
})
export class ParenthesizedExpression {
    kind: ts.SyntaxKind.ParenthesizedExpression;
    @PlainPro({ isClass: true })
    expression: Expression;
}
@Plain({
    desc: ts.SyntaxKind.TemplateHead
})
export class TemplateHead {
    kind: ts.SyntaxKind.TemplateHead;
}
@Plain({
    desc: ts.SyntaxKind.TemplateExpression
})
export class TemplateExpression {
    kind: ts.SyntaxKind.TemplateExpression;
    @PlainPro({ isClass: true })
    head: TemplateHead;
    @PlainPro({ isClass: true })
    templateSpans: TemplateSpan[];
}
@Plain({
    desc: ts.SyntaxKind.TemplateSpan
})
export class TemplateSpan {
    kind: ts.SyntaxKind.TemplateSpan;
    @PlainPro({ isClass: true })
    expression: Expression;
    @PlainPro({ isClass: true })
    literal: TemplateMiddle | TemplateTail;
}
@Plain({
    desc: ts.SyntaxKind.TemplateMiddle
})
export class TemplateMiddle {
    rawText?: string;
    kind: ts.SyntaxKind.TemplateMiddle;
}
@Plain({
    desc: ts.SyntaxKind.FunctionExpression
})
export class FunctionExpression {
    kind: ts.SyntaxKind.FunctionExpression;
    @PlainPro({ isClass: true })
    name?: Identifier;
    @PlainPro({ isClass: true })
    body: FunctionBody;
}
@Plain({
    desc: ts.SyntaxKind.TemplateTail
})
export class TemplateTail {
    kind: ts.SyntaxKind.TemplateTail;
}
@Plain({
    desc: ts.SyntaxKind.ThisKeyword
})
export class ThisExpression {
    kind: ts.SyntaxKind.ThisKeyword;
}
@Plain({
    desc: ts.SyntaxKind.SuperKeyword
})
export class SuperExpression {
    kind: ts.SyntaxKind.SuperKeyword;
}
@Plain({
    desc: ts.SyntaxKind.ImportKeyword
})
export class ImportExpression {
    kind: ts.SyntaxKind.ImportKeyword;
}
@Plain({
    desc: ts.SyntaxKind.NullKeyword
})
export class NullLiteral {
    kind: ts.SyntaxKind.NullKeyword;
}
@Plain({
    desc: [ts.SyntaxKind.TrueKeyword, ts.SyntaxKind.FalseKeyword]
})
export class BooleanLiteral {
    kind: ts.SyntaxKind.TrueKeyword | ts.SyntaxKind.FalseKeyword;
}
@Plain({
    desc: ts.SyntaxKind.PartiallyEmittedExpression
})
export class PartiallyEmittedExpression {
    kind: ts.SyntaxKind.PartiallyEmittedExpression;
    @PlainPro({ isClass: true })
    expression: Expression;
}
@Plain({
    desc: ts.SyntaxKind.NonNullExpression
})
export class NonNullExpression {
    kind: ts.SyntaxKind.NonNullExpression;
    @PlainPro({ isClass: true })
    expression: Expression;
}
@Plain({
    desc: ts.SyntaxKind.PostfixUnaryExpression
})
export class PostfixUnaryExpression {
    @PlainPro()
    kind: ts.SyntaxKind.PostfixUnaryExpression;
    @PlainPro({ isClass: true })
    operand: LeftHandSideExpression;
    @PlainPro({ isClass: true })
    operator: ts.PostfixUnaryOperator;
}
@Plain({
    desc: ts.SyntaxKind.PrefixUnaryExpression
})
export class PrefixUnaryExpression {
    @PlainPro()
    kind: ts.SyntaxKind.PrefixUnaryExpression;
    @PlainPro()
    operator: ts.PrefixUnaryOperator;
    @PlainPro({ isClass: true })
    operand: UnaryExpression;
}
@Plain({
    desc: ts.SyntaxKind.DeleteExpression
})
export class DeleteExpression {
    @PlainPro()
    kind: ts.SyntaxKind.DeleteExpression;
    @PlainPro({ isClass: true })
    expression: UnaryExpression;
}
@Plain({
    desc: ts.SyntaxKind.TypeOfExpression
})
export class TypeOfExpression {
    @PlainPro()
    kind: ts.SyntaxKind.TypeOfExpression;
    @PlainPro({ isClass: true })
    expression: UnaryExpression;
}
@Plain({
    desc: ts.SyntaxKind.VoidExpression
})
export class VoidExpression {
    @PlainPro()
    kind: ts.SyntaxKind.VoidExpression;
    @PlainPro({ isClass: true })
    expression: UnaryExpression;
}
@Plain({
    desc: ts.SyntaxKind.AwaitExpression
})
export class AwaitExpression {
    @PlainPro()
    kind: ts.SyntaxKind.AwaitExpression;
    @PlainPro({ isClass: true })
    expression: UnaryExpression;
}
@Plain({
    desc: ts.SyntaxKind.TypeAssertionExpression
})
export class TypeAssertion {
    @PlainPro()
    kind: ts.SyntaxKind.TypeAssertionExpression;
    @PlainPro({ isClass: true })
    type: TypeNode;
    @PlainPro({ isClass: true })
    expression: UnaryExpression;
}
@Plain({
    desc: ts.SyntaxKind.CommaListExpression
})
export class CommaListExpression {
    @PlainPro()
    kind: ts.SyntaxKind.CommaListExpression;
    @PlainPro({ isClass: true })
    elements: Expression[];
}
@Plain({
    desc: ts.SyntaxKind.JsxExpression
})
export class JsxExpression {
    @PlainPro()
    kind: ts.SyntaxKind.JsxExpression;
    @PlainPro()
    dotDotDotToken?: ts.Token<ts.SyntaxKind.DotDotDotToken>;
    @PlainPro({ isClass: true })
    expression?: Expression;
}
@Plain({
    desc: ts.SyntaxKind.AsExpression
})
export class AsExpression {
    @PlainPro()
    kind: ts.SyntaxKind.AsExpression;
    @PlainPro({ isClass: true })
    expression: Expression;
    @PlainPro({ isClass: true })
    type: TypeNode;
}
@Plain({
    desc: ts.SyntaxKind.CallExpression
})
export class CallExpression {
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
}
@Plain({
    desc: ts.SyntaxKind.NewExpression
})
export class NewExpression {
    @PlainPro()
    kind: ts.SyntaxKind.NewExpression;
    @PlainPro({ isClass: true })
    expression: LeftHandSideExpression;
    @PlainPro({ isClass: true })
    typeArguments?: TypeNode[];
    @PlainPro({ isClass: true })
    arguments?: Expression[];
}
@Plain({
    desc: ts.SyntaxKind.SpreadElement
})
export class SpreadElement {
    @PlainPro()
    kind: ts.SyntaxKind.SpreadElement;
    @PlainPro({ isClass: true })
    expression: Expression;
}
@Plain({
    desc: ts.SyntaxKind.ConditionalExpression
})
export class ConditionalExpression {
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
}
@Plain({
    desc: ts.SyntaxKind.ElementAccessExpression
})
export class ElementAccessExpression {
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
}

@Plain({
    desc: ts.SyntaxKind.OmittedExpression
})
export class OmittedExpression {
    @PlainPro()
    kind: ts.SyntaxKind.OmittedExpression;
}
@Plain({
    desc: ts.SyntaxKind.YieldExpression
})
export class YieldExpression {
    @PlainPro()
    kind: ts.SyntaxKind.YieldExpression;
    @PlainPro()
    asteriskToken?: ts.AsteriskToken;
    @PlainPro({
        isClass: true
    })
    expression?: Expression;
}
@Plain({
    desc: ts.SyntaxKind.SyntheticExpression
})
export class SyntheticExpression {
    @PlainPro()
    kind: ts.SyntaxKind.SyntheticExpression;
    @PlainPro()
    isSpread: boolean;
    @PlainPro()
    type: ts.Type;
}
@Plain({
    desc: ts.SyntaxKind.PropertyAccessExpression
})
export class PropertyAccessExpression {
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
}
@Plain({
    desc: ts.SyntaxKind.BigIntLiteral
})
export class BigIntLiteral {
    @PlainPro()
    kind: ts.SyntaxKind.BigIntLiteral;
}
@Plain({
    desc: ts.SyntaxKind.NumericLiteral
})
export class NumericLiteral {
    @PlainPro()
    kind: ts.SyntaxKind.NumericLiteral;
}
@Plain({
    desc: ts.SyntaxKind.ClassDeclaration
})
export class ClassDeclaration {
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
}


@Plain({
    desc: ts.SyntaxKind.PropertyDeclaration
})
export class PropertyDeclaration {
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
}
@Plain({
    desc: ts.SyntaxKind.SemicolonClassElement
})
export class SemicolonClassElement {
    @PlainPro()
    kind: ts.SyntaxKind.SemicolonClassElement;
}
@Plain({
    desc: ts.SyntaxKind.HeritageClause
})
export class HeritageClause {
    @PlainPro()
    kind: ts.SyntaxKind.HeritageClause;
    @PlainPro()
    token: ts.SyntaxKind.ExtendsKeyword | ts.SyntaxKind.ImplementsKeyword;
    @PlainPro({ isClass: true })
    types: ExpressionWithTypeArguments[];
}

@Plain({
    desc: ts.SyntaxKind.ExpressionWithTypeArguments
})
export class ExpressionWithTypeArguments {
    @PlainPro()
    kind: ts.SyntaxKind.ExpressionWithTypeArguments;
    @PlainPro({
        isClass: true
    })
    expression: LeftHandSideExpression;
}
@Plain({
    desc: ts.SyntaxKind.ExportAssignment
})
export class ExportAssignment {
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
}
export interface Visitor { }
