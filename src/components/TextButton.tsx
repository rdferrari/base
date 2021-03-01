import React from "react";
import styled from "styled-components/native";

const ButtonContainer = styled.TouchableOpacity`
  padding: 12px;
`;

const ButtonText = styled.Text`
  color: black;
  font-size: 16px;
  text-align: center;
`;

interface Props {
  bgColor?: string;
  title: string;
  onPress(): void;
}

const TextButton = ({ onPress, title }: Props) => (
  <ButtonContainer onPress={onPress}>
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
);
export default TextButton;
