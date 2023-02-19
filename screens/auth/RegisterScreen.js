import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useCallback, useState } from "react";
import Logo from "../../assets/svg/add_33.svg";

export const RegisterScreen = () => {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const keyboardHide = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
  };
  const keyboardHideInput = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
    setEmail("");
    setPassword("");
    console.log(`'email:' ${email}, 'password: ' ${password}`);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <ImageBackground
          source={require("../../assets/images/Photo_BG.png")}
          style={styles.image}
        >
          <View style={styles.back}>
            <Text style={styles.textTitle}>Увійти</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View
                style={{
                  ...styles.form,
                  marginBottom: isKeyboardShow ? -100 : 45,
                }}
              >
                <TextInput
                  value={email}
                  onChangeText={emailHandler}
                  placeholder="Адреса електронної пошти"
                  placeholderTextColor="#BDBDBD"
                  style={styles.input}
                  onFocus={() => setIsKeyboardShow(true)}
                />
                <TextInput
                  value={password}
                  onChangeText={passwordHandler}
                  placeholder="Пароль"
                  placeholderTextColor="#BDBDBD"
                  secureTextEntry={true}
                  style={styles.input}
                  onFocus={() => setIsKeyboardShow(true)}
                />

                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.8}
                  onPress={keyboardHideInput}
                >
                  <Text style={styles.btnTitle}>Увійти</Text>
                </TouchableOpacity>
                <Text style={styles.textRegistration}>
                  Немає облікового запису? Зареєструватись
                </Text>
              </View>
            </KeyboardAvoidingView>

            {/* <StatusBar style="auto" /> */}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",

    justifyContent: "flex-end",
    alignItems: "center",
  },
  back: {
    position: "relative",
    width: "100%",
    marginHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  textTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
    marginTop: 32,
    marginBottom: 32,
  },
  input: {
    width: 343,
    height: 50,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
    marginBottom: 16,
  },
  btn: {
    width: 343,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
    marginHorizontal: 30,
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,

    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "#f0f8ff",
      },
      android: {
        backgroundColor: "#FF6C00",
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  textRegistration: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  form: {
    marginBottom: 45,
    alignItems: "center",
  },
});