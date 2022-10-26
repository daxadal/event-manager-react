import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 1rem;
  border: 1px solid;
  border-radius: 1rem;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Title = styled.h2`
  flex: 1 0 auto;
`;

const Center = styled.div`
  flex: 0 0 auto;
  align-self: center;
`;

const Bottom = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const BottomCenter = styled.span`
  flex: 1 0 0;
`;

interface CardProps {
  title: string;
  center: React.ReactNode;
  leftCorner: React.ReactNode;
  rightCorner: React.ReactNode;
}

export default function Card(props: CardProps) {
  const { title, center, leftCorner, rightCorner } = props;
  return (
    <Container>
      <Title>{title}</Title>
      <Center>{center}</Center>
      <Bottom>
        {leftCorner}
        <BottomCenter />
        {rightCorner}
      </Bottom>
    </Container>
  );
}
