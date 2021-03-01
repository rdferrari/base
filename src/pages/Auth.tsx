import React, { useState } from "react";
import { PageContainer, PageTitle } from "../styles/general";
import { UserStatusContext } from "../../App";
// components
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import ConfirmationUser from "../components/ConfirmationUser";
import TextButton from "../components/TextButton";

function Auth() {
  const [auth, setAuth] = useState("sign-in");

  return (
    <UserStatusContext.Consumer>
      {(user) => (
        <PageContainer>
          <PageTitle>Authorization</PageTitle>
          {console.log(user)}
          {!user && auth === "sign-up" && (
            <>
              <SignUp />
            </>
          )}
          {!user && auth === "sign-in" && (
            <>
              <SignIn />
            </>
          )}
          {auth === "confirmation-user" && (
            <>
              <ConfirmationUser />
            </>
          )}
          <TextButton
            onPress={() => setAuth("confirmation-user")}
            title="Confirm user"
          />
          <TextButton onPress={() => setAuth("sign-in")} title="Sign in" />
          <TextButton onPress={() => setAuth("sign-up")} title="Sign up" />
        </PageContainer>
      )}
    </UserStatusContext.Consumer>
  );
}

export default Auth;
