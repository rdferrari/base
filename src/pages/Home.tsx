import React from "react";
// import { View, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.Text`
  font-size: 18px;
  color: blue;
  font-weight: 500;
`;

function Home() {
  return (
    <Container>
      <H1>Home</H1>
    </Container>
  );
}

export default Home;
