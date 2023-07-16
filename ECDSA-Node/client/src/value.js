// require('dotenv') .config();
import { Buffer } from 'buffer';
import pkg from 'secp256k1';
const {publicKeyCreate} = pkg;
import {keccak256} from 'ethereum-cryptography/keccak.js';
import {toHex} from 'ethereum-cryptography/utils.js';


//Digital Signature generation through privateKey and message
export function getDigitalSign(msg,privateKey){
  const messageUint8Array = new Uint8Array(msg);
  const messageHash = keccak256(messageUint8Array);
  const privateKeyBuffer = Buffer.from(privateKey, 'hex');
  const privateKeyUint8Array = new Uint8Array(privateKeyBuffer);
  const sign = pkg.ecdsaSign(messageHash, privateKeyUint8Array, { recovered: true });
  const signUint8Array = new Uint8Array(sign);
  const signHash = keccak256(signUint8Array);
  const signHex = toHex(signHash);
  return signHex;
}
//PublicKey generation through privateKey
export function getPublicKey(privateKey){
  const privateKeyBuffer = Buffer.from(privateKey, 'hex');
  const privateKeyUint8Array = new Uint8Array(privateKeyBuffer);
  const publicKeyUint8Array = publicKeyCreate(privateKeyUint8Array);
  const publicKey = toHex(publicKeyUint8Array);
  return publicKey;
};
//Address generation through privateKey
export function getAddress(privateKey){
  const privateKeyBuffer = Buffer.from(privateKey, 'hex');
  const privateKeyUint8Array = new Uint8Array(privateKeyBuffer);
  const publicKeyUint8Array = publicKeyCreate(privateKeyUint8Array);
  const keccak = keccak256(publicKeyUint8Array.slice(1)); 
  const addressUint8Array = keccak.slice(keccak.length - 20)
  const address = toHex(addressUint8Array);
  return address
}