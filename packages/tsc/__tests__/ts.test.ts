import { Project } from '../lib';
import { join } from 'path';
const project = new Project([
    join(__dirname, 'src', './demo.ts'),
], join(__dirname, 'tsconfig.json'));
const node = project.getSourceFile(join(__dirname, 'src', './demo.ts'))

debugger;