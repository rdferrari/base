import React from "react";
import { PageContainer, PageTitle } from "../styles/general";
import Signup from "../components/Signup";

function Auth() {
  return (
    <PageContainer>
      <PageTitle>Authorization</PageTitle>
      <>
        <Signup />
      </>
    </PageContainer>
  );
}

export default Auth;
