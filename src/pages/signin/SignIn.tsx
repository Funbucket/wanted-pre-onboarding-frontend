import { Box, Button, FormControl, FormLabel, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "~/server/auth";
import { setLocalStorageToken } from "~/utils/auth";

const Page = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = () => {
    signin(email, password).then(async ({ data, status }) => {
      if (status === 200) {
        setLocalStorageToken(data.access_token);
        return navigate("/todo");
      } else {
        alert("로그인 실패");
      }
    });
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <VStack spacing={4} p={4} borderWidth={1} borderRadius="md">
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <VStack>
          <Button colorScheme="blue" onClick={handleSignin}>
            로그인
          </Button>
          <Text
            css={css`
              cursor: pointer;
            `}
            color="gray"
            fontSize="md"
            onClick={() => navigate("/signup")}
          >
            아직 회원이 아니신가요?
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Page;
