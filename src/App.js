import logo from './logo.svg';
import './App.css';
import { Box, Heading, HStack, Text, Progress, Spacer, Avatar, Button, VStack } from "@chakra-ui/react";

function App({ container }) {
  const name=container.getAttribute("data-name");
  const message = container.getAttribute("data-message");
  const days = container.getAttribute("data-deadline");
  
  return (
    <Box borderColor="twitter" borderStyle="solid" borderWidth={1} boxShadow="base" margin={5} padding={5} borderRadius={5}>
      <VStack spacing={5}>
        <HStack width="100%">
          <Avatar name={name} />
          <Box width="100%">
            <HStack>
              <Text>
                My Goal
              </Text>
              <Spacer />
              <Text>
                {days} to go.
              </Text>
            </HStack>
            <Progress marginTop={2} value={80} borderRadius={10} hasStripe isAnimated />
          </Box>
        </HStack>
        <Button alignSelf="flex-end" justifySelf="center">Donate</Button>
      </VStack>
      
    </Box>
  );
}

export default App;
