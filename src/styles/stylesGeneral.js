import EStyleSheet from "react-native-extended-stylesheet";

export const stylesGeneral = EStyleSheet.create({
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
    fontSize: 20,
  },
  input_default: {
    backgroundColor: "#ffffff",
    height: 46,
    marginTop: 20,
    paddingLeft: 20,
  },
  button_default: {
    backgroundColor: "#00B995",
    height: 46,
    justifyContent: "center",
    marginTop: 20,
  },
  button_text: {
    alignSelf: "center",
    color: "white"
  }
});