import { Fp, Fp2, Fp12, Point, Group, BigintTuple, BigintTwelve } from "./fields";
import { Hash, Bytes, P } from "./utils";
declare const PRIME_ORDER: bigint;
export { Fp, Fp2, Fp12, Point, P, PRIME_ORDER };
declare type PrivateKey = Bytes | bigint | number;
declare type Domain = PrivateKey;
declare type PublicKey = Bytes;
declare type Signature = Bytes;
export declare const G1: Point<bigint>;
export declare const G2: Point<BigintTuple>;
export declare function pairing(Q: Point<BigintTuple>, P: Point<bigint>, withFinalExponent?: boolean): Group<BigintTwelve>;
export declare function getPublicKey(privateKey: PrivateKey): Uint8Array;
export declare function sign(message: Hash, privateKey: PrivateKey, domain: Domain): Promise<Uint8Array>;
export declare function verify(message: Hash, publicKey: PublicKey, signature: Signature, domain: Domain): Promise<boolean>;
export declare function aggregatePublicKeys(publicKeys: PublicKey[]): Uint8Array;
export declare function aggregateSignatures(signatures: Signature[]): Uint8Array;
export declare function verifyMultiple(messages: Hash[], publicKeys: PublicKey[], signature: Signature, domain: Domain): Promise<boolean>;