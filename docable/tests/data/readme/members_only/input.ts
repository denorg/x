/// @members-only

/**
 * @memberof Docable.Util
 * @interface MyCoolInterface
 *
 * @description
 *     An interface to hold myCoolFunction's options.
 */
export interface MyCoolInterface {
  my?: string;
  cool?: string;
  interface?: string;
}

/**
 * @memberof Docable.Util
 * @function myCoolFunction
 *
 * @description
 *     A cool function that returns a message.
 *
 * @param string message
 *     The message to return.
 *
 * @return string
 *     Returns the message.
 */
export function myCoolFunction(message: string): string {
  return message;
}
