import { Link } from "react-router-dom";
import { Box, Heading, Text, Button, Flex, Spacer, VStack, HStack } from "@chakra-ui/react";

const Page = () => {
  return (
    <Box textAlign="center" mt={8}>
      <Heading as="h1" size="xl" mb={4}>
        홈 페이지
      </Heading>
      <Text fontSize="lg" mb={8}>
        원하는 페이지로 이동하세요.
      </Text>
      <Flex justify="center">
        <HStack>
          <Button as={Link} to="/todo" size="lg" mb={4} w="200px">
            할 일
          </Button>
          <Button as={Link} to="/signin" size="lg" mb={4} w="200px">
            로그인
          </Button>
          <Button as={Link} to="/signup" size="lg" mb={4} w="200px">
            회원 가입
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Page;
