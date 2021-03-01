import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";

import { ComponentTitle, Paragraph, TextInput } from "../styles/general";
import PrimaryButton from "./PrimaryButton";

type FormValues = {
  username: string;
  code: string;
};

const ConfirmationUser = () => {
  const { control, handleSubmit, errors, reset } = useForm();

  async function confirmSignUp(data: FormValues) {
    const { username, code } = data;
    try {
      const { user } = await Auth.confirmSignUp(username, code);
      console.log(user);
      reset({
        name: "",
        password: "",
      });
    } catch (err) {
      console.log({ err, data });
    }
  }

  return (
    <>
      <ComponentTitle>Sign up confirmation</ComponentTitle>
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

      <Paragraph>*Code</Paragraph>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="code"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.code && <Paragraph>Code is required.</Paragraph>}

      <PrimaryButton
        onPress={handleSubmit(confirmSignUp)}
        title="Sign up onfirmation"
        bgColor="papayawhip"
      />
    </>
  );
};

export default ConfirmationUser;
