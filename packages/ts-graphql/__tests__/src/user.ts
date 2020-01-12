export interface User {
    getName(name: string): string;
}

export interface User2 {
    title: {
        demo: () => string;
    }
}