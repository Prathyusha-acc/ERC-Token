import { Component } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";

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

      const data = await alchemy.nft.getNftsForOwner(this.state.userAddress);
      this.setState({ results: data });
      const tokenDataPromises = [];

      for (let i = 0; i < data.ownedNfts.length; i++) {
        const tokenData = alchemy.nft.getNftMetadata(
          data.ownedNfts[i].contract.address,
          data.ownedNfts[i].tokenId
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
        <Container textAlign="center" style={{ marginTop: "10%" }}>
          <Header as="h1" style={{ color: "red" }}>
            NFT Indexer 🖼
          </Header>
          <p>
            Plug in an address and this website will return all of its NFTs!
          </p>
          <Header>Get all the ERC-721 tokens of this address:</Header>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <Input
                style={{ width: "40rem", justifyContent: "center" }}
                focus
                placeholder="Enter wallet address..."
                value={this.state.userAddress}
                onChange={(event) =>
                  this.setState({ userAddress: event.target.value })
                }
              />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button loading={this.state.loading} primary>
              Fetch NFTs
            </Button>
          </Form>
        </Container>

        {this.state.hasQueried ? (
          <>
            <Header as="h3">Here are your NFTs:</Header>
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
            <Grid columns={4}>
              {this.state.results.ownedNfts.map((e, i) => {
                return (
                  <Grid.Column>
                    <Card fluid>
                      <Card.Content>
                        <b>Name:</b>{" "}
                        {this.state.tokenDataObjects[i].title?.length === 0
                          ? "No Name"
                          : this.state.tokenDataObjects[i].title}
                      </Card.Content>
                      {this.state.tokenDataObjects[i]?.rawMetadata?.image !==
                        undefined &&
                      this.state.tokenDataObjects[i]?.rawMetadata?.image[0] ===
                        "i" ? (
                        <Image
                          src={`https://ipfs.io/ipfs/${(this.state.tokenDataObjects[
                            i
                          ]?.rawMetadata?.image).slice(7)}`}
                          alt={"Image"}
                        />
                      ) : (
                        <Image
                          src={
                            this.state.tokenDataObjects[i]?.rawMetadata
                              ?.image ?? "https://via.placeholder.com/200"
                          }
                          alt={"Image"}
                        />
                      )}
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
