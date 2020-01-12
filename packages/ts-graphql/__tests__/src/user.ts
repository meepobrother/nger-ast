export interface User {
    getName(name: string): string;
}

export interface User2 {
    title: string | null;
    name: 'user' | 'meepo' | string;
    uid: 1 | 2 | 3 | 4 | number;
}