import {
  Html,
  Tailwind,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";

export const WaitlistEmail: React.FC<
  Readonly<{
    email: string;
    additional_data: any;
  }>
> = ({ email, additional_data }) => (
  <Html lang="en">
    <Head />
    <Preview>User has joined the waitlist</Preview>
    {/* <Tailwind> */}
    <Body className="bg-white">
      <Container className="container">
        <Heading className="text-3xl font-bold">
          {additional_data?.name ?? email} has joined the waitlist
        </Heading>
        {Object.keys(additional_data ?? {}).map((key) => (
          <Row key={key}>
            <Column>{key}</Column>
            <Column>{additional_data[key]}</Column>
          </Row>
        ))}
      </Container>
    </Body>
    {/* </Tailwind> */}
  </Html>
);
