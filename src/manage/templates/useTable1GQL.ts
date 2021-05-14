/*

 * @Date: 2020-05-08 16:14:11
 * @LastEditTime: 2020-10-27 14:07:26
 */

export interface Payload<T> {
  gqlCode: string;
}

export default function generateUseTable1GQL<T>(payload: Payload<T>): string {
  if (payload) {
    const { gqlCode } = payload;

    const code = `${gqlCode}`;
    return code;
  }
  return'';
}
