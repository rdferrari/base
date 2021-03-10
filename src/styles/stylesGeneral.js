import EStyleSheet from "react-native-extended-stylesheet";

export const stylesGeneral = EStyleSheet.create({
  // page
  page_container: {
    backgroundColor: "#000000",
    flex: 1,
    padding: 20,
  },
  page_title: {
    color: "#ffffff",
    fontSize: 50,
    marginBottom: 20,
  },
  page_text: {
    color: "#ffffff",
    fontSize: 20,
  },
  text_alert: {
    color: "red",
    fontSize: 12,
    fontWeight: "300",
    marginTop: -10,
  },
  text_delete: {
    color: "red",
    fontSize: 12,
    fontWeight: "300",
    margin: 20,
  },
  input_default: {
    backgroundColor: "#ffffff",
    height: 46,
    marginBottom: 10,
    paddingLeft: 20,
    width: 320,
  },
  input_text: {
    color: "#ffffff",
    fontSize: 20,
    margin: 10,
  },
  // buttons
  bt_default: {
    backgroundColor: '$actionColor',
    height: 46,
    justifyContent: "center",
    marginTop: 40,
    width: 320,
  },
  bt_action: {
    backgroundColor: '$actionColor',
  },
  bt_light: {
    backgroundColor: '$lightColor',
  },
  bt_dark: {
    backgroundColor: '$darkColor',
  },
  bt_text: {
    alignSelf: "center",
    color: "white"
  },
  // auth
  auth_container: {
    alignItems: 'center',
    flex: 1,
    marginTop: 80,
  },
  auth_form_container: {
    alignItems: 'flex-start',
  },
});