import { useState } from "react";
import styled from "styled-components";

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > label,
  button {
    margin: 10px;
    align-self: stretch;
  }
`;

const Button = styled.button``;

export default function Register() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = e.target;

    const URL = "/api/auth/register";
    const data = await fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await data.json();

    if (response.error) {
      console.log("Error: ", response);
    } else {
      //* Redirect to home page here
      console.log(response.data);
    }
  };
  return (
    <OuterContainer>
      <Container>
        <FormContainer onSubmit={onSubmit}>
          <h1>register</h1>
          <label htmlFor="username">
            <input type="text" name="username" placeholder="username" />
          </label>
          <label htmlFor="email">
            <input type="text" name="email" placeholder="email" />
          </label>
          <label htmlFor="password">
            <input type="password" name="password" placeholder="password" />
          </label>
          <Button type="submit">register</Button>
          <a href="/">home</a>
        </FormContainer>
      </Container>
    </OuterContainer>
  );
}
