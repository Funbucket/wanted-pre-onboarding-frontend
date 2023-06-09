import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/home";
import { SignIn } from "./pages/signin";
import { GlobalCSS } from "./styles";
import { SignUp } from "./pages/signup";
import { Todo } from "./pages/todo";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <GlobalCSS />
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/todo" element={<Todo />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
