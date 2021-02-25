import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";

import { ComponentTitle, Paragraph, TextInput } from "../styles/general";
import PrimaryButton from "./PrimaryButton";

type FormValues = {
  username: string;
  password: string;
  email: string;
};

const Signup = () => {
  const { control, handleSubmit, errors, reset } = useForm();

  async function signUp(data: FormValues) {
    try {
      const { user } = await Auth.signUp({
        username: data.username,
        password: data.password,
        attributes: {
          email: data.email,
        },
      });
      console.log(user);
      reset({
        name: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.log({ err, data });
    }
  }

  return (
    <>
      <ComponentTitle>Sign up form</ComponentTitle>
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

      <Paragraph>*Email</Paragraph>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="email"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.email && <Paragraph>Email is required.</Paragraph>}

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

      <PrimaryButton
        onPress={handleSubmit(signUp)}
        title="Sign up"
        bgColor="papayawhip"
      />
    </>
  );
};

export default Signup;
