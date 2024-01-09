"use client"

import { styled } from "styled-components";

type InputProps = {
  backgroundColor?: string;
  textColor?: string;
  placeholderColor?: string;
  borderColor?: string;
};

export const Input = styled.input<InputProps>`
  background-color: ${(props) => props.backgroundColor || "transparent"};
  color: ${(props) => props.textColor || "#000000"};
  border-color: ${(props) => props.borderColor || "#000000"};
  padding: 8px;
  border-radius: 12px;
  border-width: 2px;
  &::placeholder {
    color: ${(props) => props.placeholderColor || "#eeeeee"};
  }
`;