import { Fixed32, Bytes } from '../lib';
import { Plain, PlainPro, toPlain, createPlain } from '@nger/plain';

@Plain()
export class Demo {
    @PlainPro()
    id: Fixed32;

    @PlainPro()
    id2: Fixed32;

    @PlainPro()
    bytes: Bytes;
}

const demo = new Demo();
demo.id = 1.1;
demo.id2 = 1.1;
demo.bytes = Bytes.from(`1234`)
const json = toPlain(demo)
const demo2 = createPlain(json)
debugger;