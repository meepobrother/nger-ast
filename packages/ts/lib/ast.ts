import * as ts from 'typescript';
import { Plain, PlainPro } from '@nger/plain';
export abstract class Node {
    node: ts.Node;
    abstract visit(visitor: Visitor, context?: any): any;
}
export type LeftHandSideExpression =
    PropertyAccessExpression
    | ElementAccessExpression
    | Identifier
    | NumericLiteral
    | ObjectLiteralExpression
    | CallExpression
    | SuperExpression
    | NewExpression
    | ParenthesizedExpression
    | ThisExpression
    | NonNullExpression
@Plain()
export class ClassDeclaration {
    node: ts.ClassDeclaration;
    @PlainPro()
    kind: ts.SyntaxKind.ClassDeclaration
    @PlainPro({
        isClass: true
    })
    name?: Identifier;
    typeParameters?: TypeParameterDeclaration[];
    heritageClauses?: HeritageClause[];
    members: ClassElement[];
}
@Plain()
export class HeritageClause {
    @PlainPro()
    kind: ts.SyntaxKind.HeritageClause;
    @PlainPro()
    token: ts.SyntaxKind.ExtendsKeyword | ts.SyntaxKind.ImplementsKeyword;
    @PlainPro()
    types: ExpressionWithTypeArguments[];
}

@Plain()
export class ExpressionWithTypeArguments {
    @PlainPro()
    kind: ts.SyntaxKind.ExpressionWithTypeArguments;
    @PlainPro({
        isClass: true
    })
    expression: LeftHandSideExpression;
}
@Plain({
    desc: ts.SyntaxKind.Identifier
})
export class Identifier {
    @PlainPro()
    kind: ts.SyntaxKind.Identifier;
    @PlainPro()
    isInJSDocNamespace: boolean;
}
export interface Visitor { }
