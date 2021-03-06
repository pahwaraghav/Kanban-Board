import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Board from "../components/board";

import { Box, Container, Center, Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box className={styles.container} bg="#001021">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.xl" minHeight="100vh" pb={[10, 0]}>
        <Center>
          <Heading fontSize="2xl" fontWeight="bold" center color="white">
            Kanban Board
          </Heading>
        </Center>

        <Board />
        <Center>
          <Heading fontSize="lg" center color="white" mt={4}>
            Made with ❤️ By Raghav Pahwa.
          </Heading>
        </Center>
      </Container>
    </Box>
  );
}
