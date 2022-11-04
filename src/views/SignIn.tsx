import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../components/base/Button";
import Divider from "../components/base/Divider";
import Input from "../components/base/Input";
import { ModalOp } from "../reducers/modal-types";
import { signIn } from "../services/api/routes";
import { setAuthenticationToken } from "../services/api/token";
import { ModalContext } from "./Root";

const TitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledForm = styled.form`
  background-color: ${(props) => props.theme.foreground};
  border-color: ${(props) => props.theme.border};
  color: ${(props) => props.theme.text};

  margin: 1rem auto;
  border: 1px solid;
  border-radius: 1rem;
  padding: 1rem;

  max-width: 500px;

  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const openModal = useContext(ModalContext);
  const navigate = useNavigate();

  async function submit() {
    try {
      if (!email || !password) {
        openModal({
          type: ModalOp.OPEN_ERROR_MODAL,
          message: "Fill out all the fields",
        });
      } else {
        const token = await signIn({ email, password });
        setAuthenticationToken(token);
        openModal({
          type: ModalOp.OPEN_SUCCESS_MODAL,
          message: "Sign up successful",
          onClose: () => navigate("/"),
        });
      }
    } catch (error) {
      openModal({
        type: ModalOp.OPEN_ERROR_MODAL,
        message: error.message || "An error occurred",
      });
    }
  }
  return (
    <>
      <TitleDiv>
        <h1>Sign up</h1>
      </TitleDiv>
      <StyledForm
        onSubmit={(e) => {
          e.stopPropagation();
          e.preventDefault();
          submit();
        }}
      >
        <Input
          type="email"
          id="email"
          tagText="Email"
          value={email}
          onChange={setEmail}
        />
        <Input
          type="password"
          id="password"
          tagText="Password"
          value={password}
          onChange={setPassword}
        />

        <Divider />

        <Button as="button" type="submit">
          Sign up
        </Button>
      </StyledForm>
    </>
  );
}
