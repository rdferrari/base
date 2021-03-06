import React, { useState } from "react";
import { Redirect } from "react-router-native";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Auth } from "aws-amplify";
import { useForm, Controller } from "react-hook-form";
import { stylesGeneral } from "../styles/stylesGeneral";

type FormValues = {
  username: string;
  code: string;
};

const ConfirmationUser = () => {
  const { control, handleSubmit, errors, reset } = useForm();
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [showResendLink, setShowResendLink] = useState(false);

  async function confirmUser(data: FormValues) {
    const { username, code } = data;
    try {
      const { user } = await Auth.confirmSignUp(username, code);
      setUserConfirmed(true);
      reset({
        username: "",
        password: "",
      });
    } catch (err) {
      console.log({ err, data });
    }
  }

  async function resendCode(data: FormValues) {
    const { username } = data;
    try {
      await Auth.resendSignUp(username);
      setShowResendLink(false);
      console.log("code resent successfully");
      reset({
        username: "",
      });
    } catch (err) {
      console.log("error resending code: ", err);
    }
  }

  if (userConfirmed) return <Redirect to="sign-in" />;

  if (showResendLink) {
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
              <Text style={stylesGeneral.text_alert}>
                Username is required.
              </Text>
            )}

            <TouchableOpacity
              style={stylesGeneral.bt_default}
              onPress={handleSubmit(resendCode)}
            >
              <Text style={stylesGeneral.bt_text}>Resend code</Text>
            </TouchableOpacity>
            <TouchableOpacity style={stylesGeneral.bt_default}>
              <Text
                onPress={() => setShowResendLink(!showResendLink)}
                style={stylesGeneral.bt_text}
              >
                Confirmation code
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={stylesGeneral.page_container}>
      <View style={stylesGeneral.auth_container}>
        <Text style={stylesGeneral.page_title}>User confirmation</Text>
        <Text style={stylesGeneral.input_text}>
          Please, verify your email and confirm your account with your username
          and code.
        </Text>

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

          <Text style={stylesGeneral.input_text}>*Code</Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={stylesGeneral.input_default}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Code"
              />
            )}
            name="code"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.code && (
            <Text style={stylesGeneral.text_alert}>Code is required!</Text>
          )}

          <Text style={stylesGeneral.text_alert}>{userConfirmed}</Text>

          <TouchableOpacity
            style={stylesGeneral.bt_default}
            onPress={handleSubmit(confirmUser)}
          >
            <Text style={stylesGeneral.bt_text}>Confirm user</Text>
          </TouchableOpacity>

          <TouchableOpacity style={stylesGeneral.bt_default}>
            <Text
              onPress={() => setShowResendLink(!showResendLink)}
              style={stylesGeneral.bt_text}
            >
              Resend the verification code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ConfirmationUser;
