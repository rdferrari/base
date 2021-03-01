import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";

import { ComponentTitle, Paragraph, TextInput } from "../styles/general";
import PrimaryButton from "./PrimaryButton";

type FormValues = {
  username: string;
  password: string;
};

const SignIn = () => {
  const { control, handleSubmit, errors, reset } = useForm();
  const [error, setError] = useState("");

  async function signIn(data: FormValues) {
    const { username, password } = data;
    try {
      const { user } = await Auth.signIn({
        username,
        password,
      });
      console.log(user);
      reset({
        name: "",
        password: "",
      });
    } catch (err) {
      console.log({ err, data });
      setError(err.message);
    }
  }

  return (
    <>
      <ComponentTitle>Sign in form</ComponentTitle>
      <Paragraph>*Username</Paragraph>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="username"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.username && <Paragraph>Username is required.</Paragraph>}

      <Paragraph>*Password</Paragraph>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="password"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.password && <Paragraph>Password is required.</Paragraph>}

      {error}

      <PrimaryButton
        onPress={handleSubmit(signIn)}
        title="Sign in"
        bgColor="papayawhip"
      />
    </>
  );
};

export default SignIn;
