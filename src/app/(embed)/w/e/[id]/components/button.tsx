"use client"

import { styled } from "styled-components";

type ButtonProps = {
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
};

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) => props.backgroundColor || "transparent"};
  color: ${(props) => props.textColor || "#000000"};
  border-color: ${(props) => props.borderColor || "#000000"};
  padding: 8px;
  border-radius: 12px;
  border-width: 2px;
  font-weight: bold;
`;