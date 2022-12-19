export interface Enum {
    value: number;
    label: string;
}

export type EnumConstant = Record<string, Enum>;
