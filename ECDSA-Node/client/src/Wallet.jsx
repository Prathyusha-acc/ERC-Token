import server from "./server";

import { getAddress } from "./value.js";
import { getPublicKey } from "./value.js";
import { getDigitalSign } from "./value.js";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
  publicKey,
  setPublicKey,
  digitalSign,
  setDigitalSign,
}) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    const address = await getAddress(privateKey);
    setAddress(address);
    const digitalSign = await getDigitalSign("PRATHYUSHA", privateKey);
    setDigitalSign(digitalSign);
    const publicKey = await getPublicKey(privateKey);
    setPublicKey(publicKey);
    if (address) {
      console.log("Hi Prathyusha");
      const {
        data: { balance },
      } = await server.get(`balance/${privateKey}`);
      console.log("Hello Prathyusha");
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input
          placeholder="Type in a Private Key"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>

      <div>Address : {address}</div>

      <div>Digital Signature : {digitalSign}</div>

      <div>PublicKey : {publicKey}</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
