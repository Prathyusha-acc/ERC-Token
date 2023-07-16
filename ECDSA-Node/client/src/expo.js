import { getAddress } from "./value.js";
import { getPublicKey } from "./value.js";
import { getdigitalSign } from "./value.js";

const privateKey = '128c3445f00e4f81eb451c793b673fc8a488eb2b1cec077c3ba4927d35d5cb2c';
console.log("PrivateKey : ",privateKey);

function address(){
    const address = getAddress(privateKey);
    return address;
}
console.log("Address :",address());
function publicKey(){
    const publicKey = getPublicKey(privateKey);
    return publicKey;
}
console.log("PublicKey :",publicKey());
function digitalSign(){
    const sign = getdigitalSign("hello",privateKey);
    return sign;
}
console.log("Digital Signature :",digitalSign());


// const valuesSet = [
//     {
//         privateKey:"128c3445f00e4f81eb451c793b673fc8a488eb2b1cec077c3ba4927d35d5cb2c",
//         publicKey:"02b4f031a3eb4646aee94a53d893437b24c3fffee75d190fc55d8517f15a075973",
//         address:"bbda8656e7aed4efc732424adef3c65080e1a7a9",
//         digital_sign:"c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
//     },
//     {
//         privateKey:"2fa159b8303b65a369cbe7efe3407034ac74ee3a07635e73d1d5284f668e1a56",
//         publicKey:"03f5413cac7550e057f2438a49f78dd6b38aab71f03760ca8d8d2c933c9be1e6ca",
//         address:"7f650ef7b3127b712eb4d78630968c66283a7ce3",
//         digital_sign:"c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
//     },
//     {
//         privateKey:"16d7f36301a5622d3fcd0a1b6198af2f2ae61fc4083d5eb224500b17cb7f9e37",
//         publicKey:"032c5e10a65791541aecccf6f9fd7f692f609305111f25570755fed075a35a9361",
//         address:"dd2710e134c613d7fbac44a6257de852b8a47a5d",
//         digital_sign:"c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470",
//     },
// ]