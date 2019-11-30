import { Source } from './source';
export interface SourceLocation {
    readonly line: number;
    readonly column: number;
}
export function getLocation(source: Source, position: number): SourceLocation {
    const lineRegexp = /\r\n|[\n\r]/g;
    let line = 1;
    let column = position + 1;
    let match;
    while ((match = lineRegexp.exec(source.body)) && match.index < position) {
        line += 1;
        column = position + 1 - (match.index + match[0].length);
    }
    return { line, column };
}
