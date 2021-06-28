import logo from './logo.svg';
import './App.css';
import { Box, Heading } from "@chakra-ui/react";

function App({ container }) {
  const message = container.getAttribute("data-message");
  return (
    <Box boxShadow="base">
      <Heading>
        {message}
      </Heading>
    </Box>
  );
}

export default App;
