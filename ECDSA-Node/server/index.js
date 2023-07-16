const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

////These are Private keys
// const balances = {
//   "128c3445f00e4f81eb451c793b673fc8a488eb2b1cec077c3ba4927d35d5cb2c": 100,
//   "2fa159b8303b65a369cbe7efe3407034ac74ee3a07635e73d1d5284f668e1a56": 50,
//   "16d7f36301a5622d3fcd0a1b6198af2f2ae61fc4083d5eb224500b17cb7f9e37": 75,
// };

////These are Publick Keys
// const balances = {
//   "02b4f031a3eb4646aee94a53d893437b24c3fffee75d190fc55d8517f15a075973": 100,
//   "03f5413cac7550e057f2438a49f78dd6b38aab71f03760ca8d8d2c933c9be1e6ca": 50,
//   "032c5e10a65791541aecccf6f9fd7f692f609305111f25570755fed075a35a9361": 75,
// };

////These are Addresses
const balances = {
  bbda8656e7aed4efc732424adef3c65080e1a7a9: 100,
  "7f650ef7b3127b712eb4d78630968c66283a7ce3": 50,
  dd2710e134c613d7fbac44a6257de852b8a47a5d: 75,
};
app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
