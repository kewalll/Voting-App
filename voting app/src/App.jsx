import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Login from "./Components/Login";
import Connected from "./Components/Connected";
import Finished from "./Components/Finished";
import { contractAddress, contractAbi } from "./Constant/constant";

const App = () => {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [votingStatus, setVotingStatus] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [candidates, setCandidates] = useState([]);
  const [number, setNumber] = useState("");

  useEffect(() => {
    getCandidates();
    getCurrentStatus();
    getRemainingTime();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  });

  async function handleAccountsChanged(accounts) {
    if (accounts.length > 0 && account != accounts[0]) {
      setAccount(accounts[0]);
      getCanVote();
    } else {
      setIsConnected(false);
      setAccount(null);
    }
  }

  async function getCandidates() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );

    try {
      const candidatesList = await contractInstance.getAllVotesOfCandiates();
      console.log("Raw candidatesList:", candidatesList);
      const formattedCandidates = candidatesList.map((candidate, index) => {
        return {
          index: index,
          name: candidate[0], // The name is at index 0 of each candidate object
          voteCount: Number(candidate[1]), // The vote count is at index 1 of each candidate object
        };
      });
      setCandidates(formattedCandidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  }

  async function getCurrentStatus() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    const status = await contractInstance.getVotingStatus();
    setVotingStatus(status);
  }

  async function getRemainingTime() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    const time = await contractInstance.getRemainingTime();
    setRemainingTime(parseInt(time, 16));
  }

  async function connectToWallet() {
    if (window.ethereum) {
      try {
        // Use BrowserProvider for interacting with MetaMask
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        // Request account access
        await provider.send("eth_requestAccounts", []);

        // Get the signer from the provider
        const signer = await provider.getSigner();

        // Fetch the address
        const address = await signer.getAddress();
        console.log("Metamask Connected at ", address);

        // Update state with account and connection status
        setAccount(address);
        setIsConnected(true);
        getCanVote();
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      console.error("MetaMask is not detected in the browser.");
    }
  }

  async function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  const [canVote, setCanVote] = useState(false);
  async function getCanVote() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    const voteStatus = await contractInstance.voters(await signer.getAddress());
    setCanVote(voteStatus);
  }

  async function vote() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );

    const tx = await contractInstance.vote(number);
    await tx.wait();
    getCanVote();
  }

  return (
    <div>
      {votingStatus ? (
        isConnected ? (
          <Connected
            account={account}
            candidates={candidates}
            remainingTime={remainingTime}
            number={number}
            handleNumberChange={handleNumberChange}
            vote={vote}
            show={canVote}
          />
        ) : (
          <Login connectWallet={connectToWallet} />
        )
      ) : (
        <Finished />
      )}
    </div>
  );
};

export default App;
