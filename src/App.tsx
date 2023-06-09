import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./pages/home";
import { SignIn } from "./pages/signin";
import { GlobalCSS } from "./styles";
import { SignUp } from "./pages/signup";
import { Todo } from "./pages/todo";
import { ChakraProvider } from "@chakra-ui/react";
import { getLocalStorageToken } from "./utils/auth";

function App() {
  const accessToken = getLocalStorageToken();

  return (
    <ChakraProvider>
      <GlobalCSS />
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={accessToken ? <Navigate to="/todo" replace /> : <SignIn />} />
            <Route path="/signup" element={accessToken ? <Navigate to="/todo" replace /> : <SignUp />} />
            <Route path="/todo" element={!accessToken ? <Navigate to="/signin" replace /> : <Todo />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
