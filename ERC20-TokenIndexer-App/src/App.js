import { Component } from "react";
import { Alchemy, Network, Utils } from "alchemy-sdk";
import { ethers } from "ethers";
import "./App.css";

import {
  Container,
  Header,
  Input,
  Button,
  Grid,
  Image,
  Card,
  Form,
  Message,
} from "semantic-ui-react";

class App extends Component {
  state = {
    userAddress: "",
    results: "",
    hasQueried: false,
    tokenDataObjects: [],
    loading: false,
    errorMessage: "",
    ensName: "",
    ensAddress: "",
  };
  async componentDidMount() {
    const { ethereum } = window;
    try {
      await ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          this.setState({ userAddress: accounts[0] });
        });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
  }
  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    try {
      const config = {
        apiKey: "8e1MOvHVeJNBP-Kt40Zid2kfBmOwwvfO",
        network: Network.ETH_MAINNET,
      };

      const alchemy = new Alchemy(config);
      const provider = new ethers.getDefaultProvider(
        "https://eth-mainnet.g.alchemy.com/v2/dckc6EyFlg8OJXev3c35ZgnNySD8f1eI"
      );
      const ens = await provider.lookupAddress(this.state.userAddress);
      this.setState({ ensName: ens });
      this.setState({ ensAddress: this.state.userAddress });

      const data = await alchemy.core.getTokenBalances(this.state.userAddress);
      this.setState({ results: data });
      const tokenDataPromises = [];

      for (let i = 0; i < data.tokenBalances.length; i++) {
        const tokenData = alchemy.core.getTokenMetadata(
          data.tokenBalances[i].contractAddress
        );
        this.setState({ hasQueried: false });
        tokenDataPromises.push(tokenData);
      }

      this.setState({ tokenDataObjects: await Promise.all(tokenDataPromises) });
      this.setState({ hasQueried: true });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false, userAddress: "" });
  };
  render() {
    return (
      <Container>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
        ></link>
        <Container textAlign="center" style={{ marginTop: "2rem" }}>
          <Header as="h1" color="green">
            ERC-20 Token Indexer
          </Header>
          <Header h3>
            Plug in an address and this website will return all of its ERC-20
            token balances!
          </Header>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <Input
                style={{ width: "40rem", justifyContent: "center" }}
                focus
                placeholder="Enter address..."
                value={this.state.userAddress}
                onChange={(event) =>
                  this.setState({ userAddress: event.target.value })
                }
              />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button loading={this.state.loading} primary>
              Check ERC-20 Token Balances
            </Button>
          </Form>
        </Container>

        {this.state.hasQueried ? (
          <>
            <Header as="h3">ERC-20 Tokens:</Header>
            {this.state.ensName ? (
              <p>
                <p>
                  <b>Address : </b>
                  {this.state.ensAddress}
                </p>
                <b>ENS Name : </b>
                {this.state.ensName}
              </p>
            ) : (
              <p>
                <p>
                  <b>Address : </b> {this.state.ensAddress}
                </p>
                <b>ENS Name : </b> null
              </p>
            )}
            <Grid columns={3}>
              {this.state.results.tokenBalances.map((e, i) => {
                const balance = Utils.formatUnits(
                  e.tokenBalance,
                  this.state.tokenDataObjects[i].decimals
                );
                return (
                  <Grid.Column>
                    <Card fluid>
                      {this.state.tokenDataObjects[i].logo ? (
                        <Image
                          src={this.state.tokenDataObjects[i].logo}
                          wrapped
                          ui={false}
                        />
                      ) : (
                        <Image
                          src="https://cutewallpaper.org/21/black-background-800x800/black-background-Meme-Generator-Imgflip.jpg"
                          wrapped
                          ui={false}
                        />
                      )}
                      <Card.Content>
                        <Card.Header>
                          <b>Symbol:</b> $
                          {this.state.tokenDataObjects[i].symbol}
                        </Card.Header>
                        <p className="box">
                          <b>Balance: </b> {balance}
                        </p>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                );
              })}
            </Grid>
          </>
        ) : (
          "Please make a query! This may take a few seconds..."
        )}
      </Container>
    );
  }
}

export default App;
