export class SourceLocation {
    line: number;
    column: number;
}
export class Source {
    body: string;
    name?: string;
    locationOffset?: SourceLocation;
    constructor(body: string, name?: string, locationOffset?: SourceLocation) {
        this.body = body;
        this.name = name;
        this.locationOffset = locationOffset;
    }
}
