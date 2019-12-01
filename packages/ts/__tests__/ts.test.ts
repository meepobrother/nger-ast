import { Project } from '../lib';
import { join } from 'path';
const project = new Project([
    join(__dirname, 'src', './demo.ts')
]);
const node = project.getSourceFile(join(__dirname, 'src', './demo.ts'))

debugger;