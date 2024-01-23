import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar.js";
import {
  commonButtonStyle,
  commonStyleInput,
  highlightButtonStyle,
} from "../../style/CommonStyle.js";
import { ToastContainer, toast } from "react-toastify";
import TextInput from "../../components/TextInput.js";
import Button from "../../components/Button.js";
import { useNavigate } from "react-router";
import callAPIOnButtonClick from "../../api/apiCall.js";
import { getUserApiUrl, updateUserApiUrl } from "../../constants/API_URL.js";
import {
  emailValidator,
  phoneNumberValidator,
} from "../../validator/Validator.js";

const MainPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<any>({
    userId: "",
    nameOfUser: "",
    emailOfUser: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    pinCode: "",
    btnDisabled: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token == undefined) {
      navigate("/");
    }
    const headers = {
      authorization: token,
    };
    callAPIOnButtonClick("GET", getUserApiUrl, {}, headers)
      .then((responseFromBackend) => {
        const { statusFromBackend, dataFromBackend }: any = responseFromBackend;
        if (statusFromBackend === 200) {
          setData({
            userId: dataFromBackend.message.userId as string,
            nameOfUser: dataFromBackend.message.nameOfUser as string,
            emailOfUser: dataFromBackend.message.emailOfUser as string,
            phoneNumber: dataFromBackend.message.phoneNumber as string,
            addressLine1: dataFromBackend.message.addressLine1 as string,
            addressLine2: dataFromBackend.message.addressLine2 as string,
            city: dataFromBackend.message.city as string,
            pinCode: dataFromBackend.message.pinCode as string,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const isValidEmail = emailValidator(data.emailOfUser);
  const isValidPhone = phoneNumberValidator(data.phoneNumber);

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
      name: "nameOfUser",
      value: data.nameOfUser,
      onChange: handleInput,
      style: { ...commonStyleInput },
      placeholder: "Name",
    },
    {
      key: "2",
      name: "emailOfUser",
      value: data.emailOfUser,
      onChange: handleInput,
      style: { ...commonStyleInput, marginTop: 20, marginBottom: 20 },
      placeholder: "Email",
    },
    {
      key: "3",
      type: "tel",
      name: "phoneNumber",
      value: data.phoneNumber,
      onChange: handleInput,
      style: { ...commonStyleInput, marginBottom: 20 },
      placeholder: "Phone Number",
    },
    {
      key: "4",
      name: "addressLine1",
      value: data.addressLine1,
      onChange: handleInput,
      style: { ...commonStyleInput, marginBottom: 20 },
      placeholder: "Address Line 1 ",
    },
    {
      key: "5",
      name: "addressLine2",
      value: data.addressLine2,
      onChange: handleInput,
      style: { ...commonStyleInput, marginBottom: 20 },
      placeholder: "Address Line 2",
    },
    {
      key: "6",
      name: "city",
      value: data.city,
      onChange: handleInput,
      style: { ...commonStyleInput, marginBottom: 20 },
      placeholder: "City",
    },
    {
      key: "7",
      name: "pinCode",
      value: data.pinCode,
      onChange: handleInput,
      style: { ...commonStyleInput, marginBottom: 20 },
      placeholder: "Pin Code",
    },
  ];

  data ? (data.btnDisabled = false) : (data.btnDisabled = true);

  const handleSubmit = async () => {
    try {
      if (!isValidEmail)
        toast.error("Email Format is Incorrect !!!", {
          position: "top-center",
          closeOnClick: false,
          closeButton: false,
          style: {
            color: "red",
            backgroundColor: "rgb(255, 206, 206)",
          },
        });
      if (!isValidPhone)
        toast.error("Mobile Number Format is Incorrect !!!", {
          position: "top-center",
          closeOnClick: false,
          closeButton: false,
          style: {
            color: "red",
            backgroundColor: "rgb(255, 206, 206)",
          },
        });
      const { statusFromBackend, dataFromBackend }: any =
        await callAPIOnButtonClick(
          "PUT",
          updateUserApiUrl + "/" + data.userId,
          data
        );
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
    <>
      <NavBar nameOfUser={data.nameOfUser} />
      <div id="mainPageForm">
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
              ? { ...commonButtonStyle, marginLeft: "3%" }
              : { ...highlightButtonStyle, marginLeft: "2%" }
          }
          className={""}
          title="Update Details"
        />
      </div>
    </>
  );
};

export default MainPage;
