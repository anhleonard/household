import { Enum, EnumConstant } from '../types/enum-constant.interface';

export const mapEnumConstantByValue = (constant: EnumConstant = {}) => {
    const map: Record<number, Enum> = {};

    for (const key in constant) {
        map[constant[key].value] = constant[key];
    }

    return map;
};

export const mapEnumConstantToArray = (constant: EnumConstant = {}) => {
    return Object.values(constant);
};
