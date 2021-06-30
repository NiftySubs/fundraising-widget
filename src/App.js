import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import { Box, Heading, HStack, Text, Spacer, Avatar, Button, VStack, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import Web3 from "web3";
import FundraisingContractABI from "./abi/FundraisingContractABI.js";
import ProgressBar from './ProgressBar';
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/micah";

const web3 = new Web3("wss://rinkeby.infura.io/ws/v3/d4c25716ab0c42818f18687bf8e6f031");
const FundraisingContract = new web3.eth.Contract(FundraisingContractABI, "0x5771d3CBbF0AF044806F1dCc9db894961f88325B");

function App({ container }) {

  const [fundraiseAgenda, setFundraiseAgenda] = useState("Fundraise Agenda");
  const [fundraiseGoal, setFundraiseGoal] = useState("");
  const [fundraiseBeneficiary, setFundraiseBeneficiary] = useState("");
  const [fundraiseAmountFunded, setFundraiseAmountFunded] = useState("");
  const [fundraiseDeadline, setFundraiseDeadline] = useState("");
  const [isLoadingFundraise, setIsLoadingFundraise] = useState(true);
  const [daysToGo, setDaysToGo] = useState("Donate Before - ");
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [fundraiser, setFundraiser] = useState(undefined);

  const fundraiseId = container.getAttribute("data-fundraise-id");
  useEffect(() => {
    init();
  }, []);


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
    setFundraiseGoal(fundraiseGoal);
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
    
  }

  const init = async() => {
    const fundraise = await FundraisingContract.methods.getFundraise(fundraiseId).call();
    console.log(fundraise);
    setFundraise(fundraise);
  }

  
  return (
    <Box borderColor="twitter" borderStyle="solid" borderWidth={1} boxShadow="base" margin={5} padding={5} borderRadius={5}>
      <VStack spacing={5}>
        <HStack width="100%">
          {/* <SkeletonCircle isLoaded={!isLoadingFundraise}> */}
            <Avatar name="Harpal Jadeja" src={getAvatar(fundraiser, {dataUri: true})}/>
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
          </Box>
        </HStack>
        <Button alignSelf="flex-end" justifySelf="center">Donate</Button>
      </VStack>
      
    </Box>
  );
}

export default App;
