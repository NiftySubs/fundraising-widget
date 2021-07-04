import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import { 
  Box, 
  Heading, 
  HStack, 
  Text, 
  Spacer, 
  Avatar, 
  Button, 
  VStack, 
  Skeleton, 
  SkeletonCircle, 
  Input,
  InputGroup,
  InputRightAddon,
  Tag
} from "@chakra-ui/react";
import Web3 from "web3";
import FundraisingContractABI from "./abi/FundraisingContractABI.js";
import ProgressBar from './ProgressBar';
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/micah";

const web3 = new Web3("wss://rinkeby.infura.io/ws/v3/d4c25716ab0c42818f18687bf8e6f031");
const FundraisingContract = new web3.eth.Contract(FundraisingContractABI, "0x608DA975Dd743Bde9ab6329258E4AD3619A533EF");

function App({ container }) {

  const [fundraiseAgenda, setFundraiseAgenda] = useState("Fundraise Agenda");
  const [fundraiseGoal, setFundraiseGoal] = useState("");
  const [fundraiseBeneficiary, setFundraiseBeneficiary] = useState("");
  const [fundraiseAmountFunded, setFundraiseAmountFunded] = useState("");
  const [fundraiseDeadline, setFundraiseDeadline] = useState("");
  const [isLoadingFundraise, setIsLoadingFundraise] = useState(true);
  const [ daysToGo, setDaysToGo] = useState("Donate Before - ");
  const [ progressPercentage, setProgressPercentage] = useState(0);
  const [ fundraiser, setFundraiser ] = useState(undefined);
  const [ fundingAmount, setFundingAmount ] = useState("0");
  const [currentAccount, setCurrentAccount] = useState();
  const [ isMetamaskInstalled, setIsMetamaskInstalled ] = useState(false);
  const [ isFunding, setIsFunding ] = useState(false);
  const [ isClaiming, setIsClaiming ] = useState(false);

  const fundraiseId = container.getAttribute("data-fundraise-id");
  const isPayable = container.getAttribute("data-payable");

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    
  }, [currentAccount]); 

  const getAvatar = (seed, config = {}) => {
    let svg = createAvatar(style, {
      seed, 
      mouth: ["smile", "laughing"],
      ...config
    });

    return svg;
  }

  const calculateDaysToGo = (timestamp) => {
    setDaysToGo(`Donate before - ${new Date(timestamp * 1000).getDate()}/${new Date(timestamp * 1000).getMonth()}/${new Date(timestamp * 1000).getFullYear()} ${new Date(timestamp * 1000).getHours()}:${new Date(timestamp * 1000).getMinutes()}:${new Date(timestamp * 1000).getSeconds()}`);
  }

  const calculatePercentage = (amountFunded, amountToBeRaised) => {
    console.log(amountFunded, amountToBeRaised);
    setProgressPercentage((amountFunded * 100) / amountToBeRaised);
    console.log((amountFunded * 100) / amountToBeRaised);
  }

  const setFundraise = async ({ fundraiseAgenda, fundraiser, fundraiseGoal, beneficiary, amountFunded, fundraiseDeadline }) => {
    setFundraiseAgenda(fundraiseAgenda);
    setFundraiseGoal(web3.utils.fromWei(fundraiseGoal, "ether"));
    setFundraiseBeneficiary(beneficiary);
    setFundraiseAmountFunded(amountFunded);
    setFundraiseDeadline(fundraiseDeadline);   
    calculatePercentage(amountFunded, fundraiseGoal);
    calculateDaysToGo(fundraiseDeadline);
    setIsLoadingFundraise(false);
    setFundraiser(fundraiser);
    
    const currentBlock = await web3.eth.getBlockNumber();
    
    FundraisingContract.events.Donation({
      filter: { fundraiseId },
      fromBlock: currentBlock
    })
    .on("data", async (event) => {
      console.log(event);
      const fundraise = await FundraisingContract.methods.getFundraise(fundraiseId).call();
      calculatePercentage(fundraise.amountFunded, fundraise.fundraiseGoal);
    });
    
    if(window.ethereum) {
      setIsMetamaskInstalled(true);      
      window.ethereum.on("accountsChanged", (accounts) => {
        setCurrentAccount(accounts[0]);
      });
    }
  }

  const init = async() => {
    const fundraise = await FundraisingContract.methods.getFundraise(fundraiseId).call();
    console.log(fundraise);
    setFundraise(fundraise);
  }

  const getCurrentAccount = async () => {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts"});
    setCurrentAccount(accounts[0]);
  }


  const handleFundingAmount = ({ target }) => {
    setFundingAmount(target.value);
  }

  const donate = async () => {
    setIsFunding(true);
    const web4 = new Web3(window.ethereum);
    const donateContract = new web4.eth.Contract(FundraisingContractABI, "0x608DA975Dd743Bde9ab6329258E4AD3619A533EF");
    donateContract.methods.donate(0).send({ from: currentAccount, value: web3.utils.toWei(fundingAmount) })
    .then((receipt) => {
      console.log(receipt);
      setIsFunding(false);
    })
    .catch((error) => {
      console.log(error);
      setIsFunding(false);
    });
    
  }

  const claimDonation = async () => {
    setIsClaiming(true);
    const web4 = new Web3(window.ethereum);
    const donateContract = new web4.eth.Contract(FundraisingContractABI, "0x608DA975Dd743Bde9ab6329258E4AD3619A533EF");
    donateContract.methods.claimDonation(0).send({ from: currentAccount })
    .then((receipt) => {
      console.log(receipt);
      setIsClaiming(false);
    })
    .catch((error) => {
      console.log(error);
      setIsClaiming(false);
    });
  }

  return (
    <Box backgroundColor="pink.500" borderColor="pink" borderStyle="solid" borderWidth={1} boxShadow="base" margin={5} padding={5} borderRadius={5}>
      <VStack spacing={5}>
        <HStack spacing={5} width="100%">
          {/* <SkeletonCircle isLoaded={!isLoadingFundraise}> */}
            <Box borderRadius="full" borderStyle="solid" borderWidth="2px" borderColor="white" padding="2px">
              <Avatar name="Harpal Jadeja" size="lg" src={getAvatar(fundraiser, {dataUri: true})}/>
            </Box>
          {/* </SkeletonCircle> */}
          <Box width="100%">
            <HStack>
              <Skeleton isLoaded={!isLoadingFundraise}>
                <Text>
                  {fundraiseAgenda}
                </Text>
              </Skeleton>
              
              <Spacer />
              <Skeleton isLoaded={!isLoadingFundraise}>
                <Text>
                  {daysToGo}.
                </Text>
              </Skeleton>
            </HStack>
            <ProgressBar value={progressPercentage} hasStripe isAnimated />
            <HStack>
              <Spacer />
              <Text>{fundraiseGoal} ETH</Text>
            </HStack>
          </Box>
        </HStack>
        {
          isPayable == "true" ?
          isMetamaskInstalled ? 
          currentAccount ?
          <VStack spacing={5}>
            <HStack>
              <InputGroup>
                <Input backgroundColor="white" value={fundingAmount} focusBorderColor="pink.400" onChange={handleFundingAmount} />
                <InputRightAddon children="ETH" />
              </InputGroup>
              <Button isLoading={isFunding} onClick={donate} alignSelf="flex-end" justifySelf="center">Donate</Button>
            </HStack>
            <Button isLoading={isClaiming} onClick={claimDonation}>Claim your Donation</Button>
            <Text>Connected as: <Tag>{currentAccount}</Tag></Text>
          </VStack>
          :
          <Button onClick={getCurrentAccount}>Connect</Button>
          :
          <Tag>Install Metamask</Tag>
          :
          null
        }
      </VStack>
      
    </Box>
  );
}

export default App;
