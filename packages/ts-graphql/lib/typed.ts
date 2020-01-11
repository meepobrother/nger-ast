/**
 * class<T>
 *  method<T>
 *    Type<T>
 * 
 * class Demo<T> {
 *  
 * }
 */
export class TypeTree {
    name: string;
    typeParameters: TypeTree[] = [];
    parent: TypeTree;
    children: TypeTree[] = [];
    constructor(name: string) {
        this.name = name;
    }
    addTypeParameter(tree: TypeTree) {
        tree.parent = this;
        this.typeParameters.push(tree)
    }
    addChild(child: TypeTree) {
        child.parent = this;
        this.children.push(child)
    }
}

const classTree = new TypeTree(`Demo`);
const method1Tree = new TypeTree(`getUser`);
const method2Tree = new TypeTree(`editUser`);

classTree.addChild(method1Tree);
classTree.addChild(method2Tree);

debugger;
