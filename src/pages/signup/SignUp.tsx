import { Box, Button, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { signup } from "~/server/auth";
import { useNavigate } from "react-router-dom";
import { getLocalStorageToken } from "~/utils/auth";
import { css } from "@emotion/react";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidate, setIsValidate] = useState(false);

  useEffect(() => {
    if (getLocalStorageToken()) {
      return navigate("/todo");
    }
  }, [navigate]);

  const handleSignup = () => {
    signup(email, password).then(async ({ status }) => {
      if (status === 201) {
        return navigate("/signin");
      } else {
        alert("회원가입 실패");
      }
    });
  };

  useEffect(() => {
    if (email.includes("@") && password.length >= 8) {
      setIsValidate(true);
    }
  }, [email, password]);

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <VStack spacing={4} p={4} borderWidth={1} borderRadius="md">
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Text fontSize="md" color="gray">
            비밀번호는 최소 8자 이상이어야 합니다.
          </Text>
        </FormControl>
        <VStack>
          <Button colorScheme="blue" onClick={handleSignup} isDisabled={!isValidate}>
            회원 가입
          </Button>
          <Text
            css={css`
              cursor: pointer;
            `}
            color="blue.500"
            fontSize="md"
            onClick={() => navigate("/signin")}
          >
            이미 회원이신가요?
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
};

export default SignUp;
