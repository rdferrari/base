import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";
import { Redirect } from "react-router-native";
import { stylesGeneral } from "../styles/stylesGeneral";

type FormValues = {
  username: string;
};

const ResendCode = () => {
  const { control, handleSubmit, errors, reset } = useForm();
  const [codeResent, setCodeResent] = useState("");

  async function confirmUser(data: FormValues) {
    const { username } = data;
    try {
      await Auth.resendSignUp(username);
      setCodeResent(username);
      console.log("code resent successfully");
      reset({
        username: "",
      });
    } catch (err) {
      console.log("error resending code: ", err);
    }
  }

  if (codeResent) return <Redirect to="/user-confirmation" />;

  return (
    <View style={stylesGeneral.page_container}>
      <View style={stylesGeneral.auth_container}>
        <Text style={stylesGeneral.page_title}>Code resend</Text>

        <View style={stylesGeneral.auth_form_container}>
          <Text style={stylesGeneral.input_text}>*Username</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={stylesGeneral.input_default}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Username"
              />
            )}
            name="username"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.username && (
            <Text style={stylesGeneral.text_alert}>Username is required.</Text>
          )}

          <TouchableOpacity
            style={stylesGeneral.bt_default}
            onPress={handleSubmit(confirmUser)}
          >
            <Text style={stylesGeneral.bt_text}>Resend code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ResendCode;
