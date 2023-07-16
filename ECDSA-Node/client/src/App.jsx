import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [digitalSign, setDigitalSign] = useState("");

  return (
    <>
      <div className="app">
        <Wallet
          balance={balance}
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
          publicKey={publicKey}
          setPublicKey={setPublicKey}
          digitalSign={digitalSign}
          setDigitalSign={setDigitalSign}
          setBalance={setBalance}
          address={address}
          setAddress={setAddress}
        />
        <Transfer setBalance={setBalance} address={address} />
      </div>
      <div className="keys">
        <h1>Private Keys are</h1>
        <p>
          "128c3445f00e4f81eb451c793b673fc8a488eb2b1cec077c3ba4927d35d5cb2c"
        </p>
        <p>
          "2fa159b8303b65a369cbe7efe3407034ac74ee3a07635e73d1d5284f668e1a56"
        </p>
        <p>
          "16d7f36301a5622d3fcd0a1b6198af2f2ae61fc4083d5eb224500b17cb7f9e37"
        </p>
      </div>
    </>
  );
}

export default App;
