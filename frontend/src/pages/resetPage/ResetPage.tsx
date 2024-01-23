import { useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { passwordValidator } from '../../validator/Validator';
import TextInput from "../../components/TextInput"
import Button from "../../components/Button"
import { commonButtonStyle, commonStyleInput, highlightButtonStyle } from '../../style/CommonStyle';
import callAPIOnButtonClick from '../../api/apiCall';
import { resetPasswordApiUrl } from '../../constants/API_URL';
import { ToastContainer, toast } from 'react-toastify';

const ResetPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [data, setData] = useState({
    password: "",
    confirmPassword: "",
    btnDisabled: true
  })

  const handleInput = (e:any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
  }

  const propsArray = [
    {
      key: "1",
      type:"password",
      name: "password",
      value: data.password,
      onChange: handleInput,
      style: { ...commonStyleInput, marginTop: 20, marginBottom: 20 },
      placeholder: "Enter Your Password"
    },
    {
      key: "2",
      type: "password",
      name: "confirmPassword",
      value: data.confirmPassword,
      onChange: handleInput,
      style: { ...commonStyleInput, marginBottom: 30 },
      placeholder: 'Confirm Your Password',
    }
  ]

  !data.password || !data.confirmPassword ? data.btnDisabled = true : data.btnDisabled = false;

  const handleSubmit = async () => {
    try {
      const isPassword1 = passwordValidator(data.password);
      const isPassword2 = passwordValidator(data.confirmPassword);
      if (isPassword1 && isPassword2 && data.password === data.confirmPassword) {
        const userData = {
          userId: params.userId,
          newPassword: data.password,
        }
        const { statusFromBackend, dataFromBackend }:any = await callAPIOnButtonClick("POST", resetPasswordApiUrl, userData);

        if (statusFromBackend == 200) {
          toast.success(dataFromBackend.message, {
            position: "top-center",
            closeOnClick: false,
            closeButton: false,
            style: {
              color: "green",
              backgroundColor: "rgb(183, 248, 183)"
            }
          })
          setTimeout(() => {
            navigate("/")
          }, 1000);
        } else {
          toast.error("Password Format is Incorrect !!!", {
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
        title="Reset Password"
      />
    </div>
  )
}

export default ResetPage