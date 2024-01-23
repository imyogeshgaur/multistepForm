import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import callAPIOnButtonClick from '../../api/apiCall';
import { forgetPasswordApiUrl } from '../../constants/API_URL';
import { errorOccurred } from '../../redux/UserSlice';
import { LinkAtCenterStyle, commonButtonStyle, commonStyleInput, highlightButtonStyle } from '../../style/CommonStyle';
import { Link } from "react-router-dom"
import TextInput from "../../components/TextInput"
import Button from '../../components/Button';
import { emailValidator } from '../../validator/Validator';
import { ToastContainer, toast } from 'react-toastify';

const ForgetPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({
    emailOfUser: "",
    btnDisabled: true
  })

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
  }

  const propsArray = [
    {
      key: "1",
      name: "emailOfUser",
      value: data.emailOfUser,
      onChange: handleInput,
      style: { ...commonStyleInput, marginTop: 20, marginBottom: 20 },
      placeholder: "Enter Your Email"
    }
  ]

  !data.emailOfUser ? data.btnDisabled = true : data.btnDisabled = false;

  const handleSubmit = async () => {
    try {
      const isEmail = emailValidator(data.emailOfUser);
      if (isEmail) {
        dispatch(errorOccurred({
          errorMessage: ""
        }))
      }
      const userData = {
        emailOfUser: data.emailOfUser
      }
      const { statusFromBackend, dataFromBackend } = await callAPIOnButtonClick("POST", forgetPasswordApiUrl, userData)

      if (statusFromBackend === 200) {
        toast.success(dataFromBackend.message, {
          position: "top-center",
          closeOnClick: false,
          closeButton: false,
          style: {
            color: "green",
            backgroundColor: "rgb(183, 248, 183)"
          }
        })
      }
    } catch (error) {
      toast.error("Some Error Occurred !!!", {
        position: "top-center",
        closeOnClick: false,
        closeButton: false,
        style: {
          color: "red",
          backgroundColor: "rgb(255, 206, 206)"
        }
      })
    }
  }

  return (
    <div id="form">
      <ToastContainer autoClose={1000} hideProgressBar={true} />
      {
        propsArray.map((val) => {
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
          )
        })
      }

      <Button
        onClick={handleSubmit}
        style={
          data.btnDisabled ?
            { ...commonButtonStyle, marginLeft: "3%", marginBottom: 20 }
            :
            { ...highlightButtonStyle, marginLeft: "2%" }
        }
        disabled={data.btnDisabled}
        title="Send Reset Email"
      />

      <Link style={LinkAtCenterStyle} to={"/"}>Back To Sign In</Link>


    </div>
  )
}

export default ForgetPage