import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { PageTitle, Paragraph, TextInput } from "../styles/general";
import PrimaryButton from "../components/PrimaryButton";

const Signin = () => {
  const [showForm, setShowForm] = useState("signUp");

  let formInputState = {
    username: "",
    password: "",
    email: "",
    verificationCode: "",
    newPasswordEmail: "",
    newPasswordUsername: "",
    newPasswordCode: "",
    newPassword: "",
  };

  const onChange = (e) => {
    formInputState = { ...formInputState, [e.target.name]: e.target.value };
  };

  async function signUp() {
    try {
      await Auth.signUp({
        username: formInputState.username,
        password: formInputState.password,
        attributes: {
          email: formInputState.email,
        },
      });
      setShowForm("confirmSignUp");
    } catch (err) {
      console.log({ err });
    }
  }

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(
        formInputState.username,
        formInputState.verificationCode
      );
    } catch (err) {
      console.log({ err });
    }
  }

  async function signIn() {
    try {
      await Auth.signIn({
        username: formInputState.username,
        password: formInputState.password,
      });
      setShowForm("forgotPassword");
    } catch (err) {
      console.log({ err });
    }
  }

  async function forgotPassword() {
    try {
      await Auth.forgotPassword({ username: formInputState.newPasswordEmail });
    } catch (err) {
      console.log({ err });
    }
  }

  async function resetPassword() {
    try {
      await Auth.forgotPasswordSubmit(
        formInputState.newPasswordUsername,
        formInputState.newPasswordCode,
        formInputState.newPassword
      );
    } catch (err) {
      console.log({ err });
    }
  }

  /* In the UI of the app, render forms based on form state */
  /* If the form state is "signUp", show the sign up form */
  if (showForm === "signUp") {
    return (
      <>
        <PageTitle>Sign up form</PageTitle>
        <Paragraph>*Username</Paragraph>
        <TextInput name="username" onChange={onChange} />
        <Paragraph>*Email</Paragraph>
        <TextInput name="email" onChange={onChange} />
        <Paragraph>*Password</Paragraph>
        <TextInput name="password" type="password" onChange={onChange} />

        <PrimaryButton onPress={signUp} title="Sign up" bgColor="papayawhip" />

        <div>
          <Paragraph>
            If you already have an account,{" "}
            <PrimaryButton
              onPress={() => setShowForm("signIn")}
              title="Sign in"
              bgColor="papayawhip"
            />
          </Paragraph>
        </div>
      </>
    );
  }

  /* If the form state is "confirmSignUp", show the sign up form */
  if (showForm === "confirmSignUp") {
    return (
      <>
        <PageTitle>Sign up confirmation form</PageTitle>
        <Paragraph>*Username</Paragraph>
        <TextInput name="username" onChange={onChange} />
        <Paragraph>*Verification code</Paragraph>
        <TextInput name="verificationCode" onChange={onChange} />
        <PrimaryButton
          onPress={confirmSignUp}
          title="Confirm sign up"
          bgColor="papayawhip"
        />
      </>
    );
  }

  /* If the form state is "signIn", show the sign in form */
  if (showForm === "signIn") {
    return (
      <>
        <PageTitle>Sign in form</PageTitle>
        <Paragraph>*Username</Paragraph>
        <TextInput name="username" onChange={onChange} />
        <Paragraph>*Password</Paragraph>
        <TextInput name="password" type="password" onChange={onChange} />
        <PrimaryButton onPress={signIn} title="Sign in" bgColor="papayawhip" />

        <>
          <Paragraph>
            If you don't have an account,{" "}
            <PrimaryButton
              onPress={() => setShowForm("signUp")}
              title="Sign up"
              bgColor="papayawhip"
            />
          </Paragraph>
          <>
            <Paragraph>
              Forgot your password,{" "}
              <PrimaryButton
                onPress={() => setShowForm("forgotPassword")}
                title="Ask for new password"
                bgColor="papayawhip"
              />
            </Paragraph>
          </>
          <>
            <Paragraph>
              Reset password,{" "}
              <PrimaryButton
                onPress={() => setShowForm("resetPassword")}
                title="Reset password"
                bgColor="papayawhip"
              />
            </Paragraph>
          </>
        </>
      </>
    );
  }

  if (showForm === "forgotPassword") {
    return (
      <div>
        <TextInput name="newPasswordEmail" onChange={onChange} />
        <Paragraph>
          Forgot your password,{" "}
          <PrimaryButton
            onPress={forgotPassword}
            title="Ask for new password"
            bgColor="papayawhip"
          />
        </Paragraph>
        <PrimaryButton
          onPress={() => setShowForm("signIn")}
          title="Back to sign in"
          bgColor="papayawhip"
        />
      </div>
    );
  }

  if (showForm === "resetPassword") {
    return (
      <div>
        <TextInput name="newPasswordUsername" onChange={onChange} />
        <TextInput name="newPasswordCode" onChange={onChange} />
        <TextInput name="newPassword" type="password" onChange={onChange} />

        <PrimaryButton
          onPress={resetPassword}
          title="Reset password"
          bgColor="papayawhip"
        />
        <>
          <PrimaryButton
            onPress={() => setShowForm("signIn")}
            title="Back to sign in"
            bgColor="papayawhip"
          />
        </>
      </div>
    );
  }

  if (showForm === "signedIn") {
    return (
      <>
        <h1>Welcome to my app!</h1>
      </>
    );
  }
};

export default Signin;
