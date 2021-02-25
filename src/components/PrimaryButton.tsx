import React from "react";
import styled from "styled-components/native";

const ButtonContainer = styled.TouchableOpacity`
  margin-vertical: 40px;
  width: 220px;
  height: 40px;
  padding: 12px;
  border-radius: 10px;
  background-color: ${(props: string) => props.bgColor};
`;

const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
`;

interface IPrimaryButton {
  onPress: string;
  bgColor: string;
  title: string;
}

const PrimaryButton = ({ onPress, bgColor, title }: IPrimaryButton) => (
  <ButtonContainer onPress={onPress} bgColor={bgColor}>
    <ButtonText>{title}</ButtonText>
  </ButtonContainer>
);
export default PrimaryButton;
