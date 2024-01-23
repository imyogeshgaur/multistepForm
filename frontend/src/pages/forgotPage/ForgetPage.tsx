import { useState } from "react";
import callAPIOnButtonClick from "../../api/apiCall";
import { forgetPasswordApiUrl } from "../../constants/API_URL";
import {
  LinkAtCenterStyle,
  commonButtonStyle,
  commonStyleInput,
  highlightButtonStyle,
} from "../../style/CommonStyle";
import { Link } from "react-router-dom";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { emailValidator } from "../../validator/Validator";
import { ToastContainer, toast } from "react-toastify";

const ForgetPage = () => {
  const [data, setData] = useState({
    emailOfUser: "",
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
      name: "emailOfUser",
      value: data.emailOfUser,
      onChange: handleInput,
      style: { ...commonStyleInput, marginTop: 20, marginBottom: 20 },
      placeholder: "Enter Your Email",
    },
  ];

  !data.emailOfUser ? (data.btnDisabled = true) : (data.btnDisabled = false);

  const handleSubmit = async () => {
    try {
      const isEmail = emailValidator(data.emailOfUser);
      if (!isEmail) {
        toast.error("Email Format is Incorrect !!!", {
          position: "top-center",
          closeOnClick: false,
          closeButton: false,
          style: {
            color: "red",
            backgroundColor: "rgb(255, 206, 206)",
          },
        });
      }
      const userData = {
        emailOfUser: data.emailOfUser,
      };
      const { statusFromBackend, dataFromBackend }: any =
        await callAPIOnButtonClick("POST", forgetPasswordApiUrl, userData);
      console.log(statusFromBackend,dataFromBackend)
      if (statusFromBackend === 200) {
        toast.success(dataFromBackend.message, {
          position: "top-center",
          closeOnClick: false,
          closeButton: false,
          style: {
            color: "green",
            backgroundColor: "rgb(183, 248, 183)",
          },
        });
      }
    } catch (error) {
      toast.error("Some Error Occurred !!!", {
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
        title="Send Reset Email"
      />

      <Link style={LinkAtCenterStyle} to={"/"}>
        Back To Sign In
      </Link>
    </div>
  );
};

export default ForgetPage;
