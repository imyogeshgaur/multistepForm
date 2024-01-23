import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { emailValidator, passwordValidator } from "../../validator/Validator";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import {
  commonButtonStyle,
  commonStyleInput,
  forgetPasswordLinkStyle,
  highlightButtonStyle,
  registerLoginLinkStyle,
} from "../../style/CommonStyle";
import callAPIOnButtonClick from "../../api/apiCall";
import { loginApiUrl } from "../../constants/API_URL";
import TextLink from "../../components/TextLink";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token !== undefined) navigate("/welcome");
  }, []);

  const [data, setData] = useState({
    emailOrPhoneOfUser: "",
    password: "",
    btnDisabled: true,
  });

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const propsArray = [
    {
      key: "1",
      name: "emailOrPhoneOfUser",
      value: data.emailOrPhoneOfUser,
      onChange: handleInput,
      style: { ...commonStyleInput, marginTop: 20, marginBottom: 20 },
      placeholder: "Enter Your Email or Phone Number",
    },
    {
      key: "2",
      type: "password",
      name: "password",
      value: data.password,
      onChange: handleInput,
      style: { ...commonStyleInput, marginBottom: 30 },
      placeholder: "Enter Your Password",
    },
  ];

  !data.emailOrPhoneOfUser || !data.password
    ? (data.btnDisabled = true)
    : (data.btnDisabled = false);

  const handleSubmit = async () => {
    try {
      const isEmail = emailValidator(data.emailOrPhoneOfUser);
      const isPhoneNumber = passwordValidator(data.password);
      if (isEmail) {
        const userData = {
          emailOfUser: data.emailOrPhoneOfUser,
          password: data.password,
        };
        const { statusFromBackend, dataFromBackend }: any =
          await callAPIOnButtonClick("POST", loginApiUrl, userData);

        if (statusFromBackend == 200) {
          localStorage.setItem("token", dataFromBackend.message);
          navigate("/welcome");
        }
      } else if (isPhoneNumber) {
        const userData = {
          phoneNumber: data.emailOrPhoneOfUser,
          password: data.password,
        };
        const { statusFromBackend, dataFromBackend }: any =
          await callAPIOnButtonClick("POST", loginApiUrl, userData);

        if (statusFromBackend == 200) {
          localStorage.setItem("token", dataFromBackend.message);
          navigate("/welcome");
        }
      } else {
        toast.error("Invalid Credentials !!!", {
          position: "top-center",
          closeOnClick: false,
          closeButton: false,
          style: {
            color: "red",
            backgroundColor: "rgb(255, 206, 206)",
          },
        });
      }
    } catch (error) {
      toast.error("Invalid Credentials !!!", {
        position: "top-center",
        closeOnClick: false,
        closeButton: false,
        style: {
          color: "red",
          backgroundColor: "rgb(255, 206, 206)",
        },
      });
    }
  };

  return (
    <div id="form">
      <ToastContainer autoClose={1000} hideProgressBar={true} />
      {propsArray.map((val) => {
        return (
          <TextInput
            key={val.key}
            name={val.name}
            type={val.type}
            value={val.value}
            placeholder={val.placeholder}
            style={val.style}
            onChange={val.onChange}
          />
        );
      })}

      <Button
        onClick={handleSubmit}
        style={
          data.btnDisabled
            ? { ...commonButtonStyle, marginLeft: "3%", marginBottom: 20 }
            : { ...highlightButtonStyle, marginLeft: "2%" }
        }
        disabled={data.btnDisabled}
        title="Login"
      />
      <Link style={forgetPasswordLinkStyle} to={"forgetPassword"}>
        Forget Password ?{" "}
      </Link>
      <TextLink
        textStyle={registerLoginLinkStyle.textStyle}
        text={"Not having account? "}
        linkStyle={registerLoginLinkStyle.linkStyle}
        linkText={"Sign Up Here"}
        navigateTo={"Register"}
      />
    </div>
  );
};

export default LoginPage;
