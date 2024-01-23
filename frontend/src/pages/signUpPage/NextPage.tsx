import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeValuesLastPage } from "../../redux/UserSlice";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import {
  commonButtonStyle,
  commonStyleInput,
  highlightButtonStyle,
} from "../../style/CommonStyle";
import { pinCodeValidator } from "../../validator/Validator";
import callAPIOnButtonClick from "../../api/apiCall";
import { signUpApiURL } from "../../constants/API_URL";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router";

const NextPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: any) => state.user);
  const [data, setData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    pinCode: "",
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
      name: "addressLine1",
      value: data.addressLine1,
      onChange: handleInput,
      style: { ...commonStyleInput },
      placeholder: "Enter Your Address Line 1",
    },
    {
      key: "2",
      name: "addressLine2",
      value: data.addressLine2,
      onChange: handleInput,
      style: { ...commonStyleInput, marginTop: 20, marginBottom: 20 },
      placeholder: "Enter Your Address Line 2",
    },
    {
      key: "3",
      name: "city",
      value: data.city,
      onChange: handleInput,
      style: { ...commonStyleInput, marginBottom: 20 },
      placeholder: "Enter Your City",
    },
    {
      key: "4",
      name: "pinCode",
      value: data.pinCode,
      onChange: handleInput,
      style: { ...commonStyleInput, marginBottom: 30 },
      placeholder: "Enter Your pinCode",
    },
  ];

  !data.addressLine1 || !data.addressLine2 || !data.pinCode || !data.city
    ? (data.btnDisabled = true)
    : (data.btnDisabled = false);

  const handleSubmit = () => {
    const isValidPinCode = pinCodeValidator(data.pinCode);

    if (!isValidPinCode) {
      toast.error("Pin Code Format is Incorrect !!!", {
        position: "top-center",
        closeOnClick: false,
        closeButton: false,
        style: {
          color: "red",
          backgroundColor: "rgb(255, 206, 206)",
        },
      });
      return;
    }

    dispatch(
      storeValuesLastPage({
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        pinCode: data.pinCode,
      })
    );
  };

  useEffect(() => {
    if (userData.pinCode && userData.errorMessage === "") {
      callAPIOnButtonClick("POST", signUpApiURL, userData)
        .then((backendResponse: any) => {
          if (backendResponse.statusFromBackend === 200) {
            toast.success(backendResponse.dataFromBackend.message, {
              position: "top-center",
              closeOnClick: false,
              closeButton: false,
              style: {
                color: "green",
                backgroundColor: "rgb(183, 248, 183)",
              },
            });
            setTimeout(() => {
              navigate("/");
            }, 1000);
          } else {
            toast.error(backendResponse.dataFromBackend.message, {
              position: "top-center",
              closeOnClick: false,
              closeButton: false,
              style: {
                color: "red",
                backgroundColor: "rgb(255, 206, 206)",
              },
            });
            setTimeout(() => {
              navigate("/NextPage");
            }, 1000);
          }
        })
        .catch((err) => {
          toast.error(err, {
            position: "top-center",
            closeOnClick: false,
            closeButton: false,
            style: {
              color: "red",
              backgroundColor: "rgb(255, 206, 206)",
            },
          });
          setTimeout(() => {
            navigate("/NextPage");
          }, 1000);
        });
    }
    data.btnDisabled = true;
  }, [userData]);

  return (
    <div id="form">
      <ToastContainer autoClose={1000} hideProgressBar={true} />
      {propsArray.map((val) => {
        return (
          <TextInput
            key={val.key}
            name={val.name}
            placeholder={val.placeholder}
            onChange={val.onChange}
            style={val.style}
            value={val.value}
          />
        );
      })}
      <Button
        onClick={handleSubmit}
        style={
          data.btnDisabled
            ? { ...commonButtonStyle, marginLeft: "2%" }
            : { ...highlightButtonStyle, marginLeft: "2%" }
        }
        disabled={data.btnDisabled}
        title="Save"
      />
      <ToastContainer autoClose={1000} hideProgressBar={true} />
    </div>
  );
};

export default NextPage;
