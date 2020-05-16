export interface IGenericObject<T> {
    [ name: string ]: T;
}

export type IType<T> = ( option: IFlagOptions, arg: IFlagArgument, value: string ) => T | undefined;

export enum OptionType {
    STRING = 'string',
    NUMBER = 'number',
    BOOLEAN = 'boolean',
}

/**
 * Flag value type.
 */
export type IFlagValueType = string | boolean | number;

/**
 *
 */
export type IFlagValue = IFlagValueType | IFlagValueType[];

/**
 * An object which represents all flags.
 */
export type IFlags = IGenericObject<undefined | IFlagValue | IFlagValue[]>;

/**
 * Parse result.
 */
export interface IFlagsResult {
    flags: IFlags;
    unknown: string[];
    literal: string[];
}

/**
 * Flag argument definition.
 */
export interface IFlagArgument {
    type?: OptionType | string;
    optionalValue?: boolean;
    variadic?: boolean;
    list?: boolean;
    separator?: string;
}

export type IDefaultValue = IFlagValue | ( () => undefined | IFlagValue );

/**
 * Flag value handler for custom value processing.
 */
export type IFlagValueHandler = ( val: any, previous?: any ) => any;

/**
 * Flag settings.
 */
export interface IFlagOptions extends IFlagArgument {
    name: string;
    args?: IFlagArgument[];
    aliases?: string[];
    standalone?: boolean;
    default?: IDefaultValue;
    required?: boolean;
    depends?: string[];
    conflicts?: string[];
    value?: IFlagValueHandler;
    collect?: boolean;
}

/**
 * Type parser method.
 */
export type ITypeHandler<T> = ( option: IFlagOptions, arg: IFlagArgument, nextValue: string ) => T;

export type IParseType<T = any> = ( type: string, option: IFlagOptions, arg: IFlagArgument, nextValue: string ) => T;

/**
 * Parse settings.
 */
export interface IParseOptions {
    parse?: IParseType;
    stopEarly?: boolean;
    allowEmpty?: boolean;
    flags?: IFlagOptions[];
    knownFlaks?: IFlags;
}
