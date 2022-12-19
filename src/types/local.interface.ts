export interface Commune {
    id: number;
    name: string;
    type: string;
}

export interface District {
    id: number;
    name: string;
    type: string;
    communes: Commune[];
}

export interface Province {
    id: number;
    name: string;
    type: string;
    districts: District[];
}

export type Locals = Province[];
