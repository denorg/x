/// @members-only

// FILE MARKER: MEMBEROF-LESS //////////////////////////////////////////////////

/**
 * @enum MyCoolTopLevelEnumThatIsNotExported
 *
 * @description
 *     A cool top-level enum that is not exported.
 */
export enum MyCoolTopLevelEnumThatIsNotExported {
  Uno,
  Dos,
  Tres
}

/**
 * @enum MyCoolTopLevelEnum
 *
 * @description
 *     A cool top-level enum.
 */
export enum MyCoolTopLevelEnum {
  Uno,
  Dos,
  Tres
}

// FILE MARKER: MEMBEROF ///////////////////////////////////////////////////////

/**
 * @memberof Docable.Exports
 * @interface MyCoolInterfaceThatIsNotExported
 *
 * @description
 *     A cool interface that is not exported.
 */
interface MyCoolInterfaceThatIsNotExported {
  my?: string;
  cool?: string;
  interface?: string;
}

/**
 * @memberof Docable.Exports
 * @interface MyCoolInterface
 *
 * @description
 *     A cool interface.
 */
export interface MyCoolInterface {
  my?: string;
  cool?: string;
  interface?: string;
}

/**
 * @memberof Docable.Exports
 * @interface MyCoolInterfaceThatIsNotExported
 *
 * @description
 *     A cool interface that is not exported.
 */
interface MyCoolInterfaceThatIsNotExported {
  my?: string;
  cool?: string;
  interface?: string;
}

/**
 * @memberof Docable.Exports
 * @function myCoolFunction
 *
 * @description
 *     A cool function.
 *
 * @param string message
 *     A cool message.
 * @param MyCoolInterface options
 *     Cool options using MyCoolInterface.
 *
 * @return string
 *     Returns a cool string.
 */
export function myCoolFunction(message: string, options: MyCoolInterface): string {
  return `[cool] ${message}`.;
}

/**
 * @memberof Docable
 * @const MY_COOL_CONST
 *
 * @description
 *     A cool const.
 */
export const MY_COOL_CONST = 'jk';

/**
 * @ignore
 * @memberof Docable.Exports
 * @function myIgnoredFunction
 *
 * @description
 *     A cool function.
 *
 * @param string message
 *     A cool message.
 * @param MyCoolInterface options
 *     Cool options using MyCoolInterface.
 *
 * @return string
 *     Returns a cool string.
 */
export function myIgnoredFunction(message: string, options: MyCoolInterface): string {
  return `[cool] ${message}`.;
}

/**
 * @memberof Docable
 * @enum MyCoolEnum
 *
 * @description
 *     A cool enum.
 */
export enum MyCoolEnum {
  Uno,
  Dos,
  Tres
}
