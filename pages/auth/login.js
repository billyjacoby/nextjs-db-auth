import { useState } from "react";
import styled from "styled-components";
import checkAuthServer from "../../util/checkAuthServer";

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

export default function Login({ user }) {
  const [userData, setUserData] = useState(user);

  const onSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = e.target;

    const URL = "/api/auth/authorize";
    const data = await fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const response = await data.json();

    if (response.data.error) {
      console.log(response.data.error);
    } else {
      e.target.reset();
      setUserData(response.data.user);
      console.log("Authorized!");
    }
  };

  const logoutClick = () => {
    setUserData(null);
    fetch("/api/auth/logout");
  };
  return (
    <OuterContainer>
      <Container>
        <FormContainer onSubmit={onSubmit}>
          {userData ? `hello ${userData.username}!` : <h1>login</h1>}

          <label htmlFor="username">
            <input type="text" name="username" placeholder="username" />
          </label>
          <label htmlFor="password">
            <input type="password" name="password" placeholder="password" />
          </label>
          <Button type="submit">login</Button>
          {userData ? (
            <Button type="button" onClick={logoutClick}>
              logout
            </Button>
          ) : (
            <a href="/auth/register">register here</a>
          )}
        </FormContainer>
      </Container>
    </OuterContainer>
  );
}

export async function getServerSideProps(context) {
  return checkAuthServer(context);
}
