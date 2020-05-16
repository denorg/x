/**
 * @memberof Docable.Classes
 * @class ClassOne
 *
 * @description
 *     Class one does class one things.
 */
export default class ClassOne {
  /**
   * @property string property_one
   *
   * @description
   *     This is the first paragraph of the description.
   *
   *     This is the second paragraph of the description.
   */
  public property_one: string = "";

  /**
   * @description
   *     This is the first paragraph.
   *     This is also the first paragraph because it is not separated by an
   *     empty line like in property_one.
   *
   * @param any myObject
   *     My object.
   * @param string myString
   *     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam finibus
   *     malesuada leo, vitae vehicula tellus. 
   *
   * @return any|undefined
   *     Returns any when something cool happens.
   *
   *     Returns undefined when something cool doesn't happen... womp womp.
   *
   * @return string
   *     You can have multiple return annotations if you that's how you roll.
   *
   * @throws SomeException
   *     Thrown when something bad happens.
   *
   * @throws SomeOtherException
   *     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam finibus
   *     malesuada leo, vitae vehicula tellus. Aliquam a est in nisi placerat
   *     placerat quis vitae lectus.
   */
  public methodOne(myObject: any, myString: string) {}
}
