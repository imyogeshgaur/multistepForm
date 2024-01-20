import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { errorOccurred, storeValuesLastPage } from '../../redux/UserSlice';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { commonButtonStyle, commonStyleInput, highlightButtonStyle } from '../../style/CommonStyle';
import { pinCodeValidator } from '../../validator/Validator';
import callAPIOnButtonClick from '../../api/apiCall';
import { signUpApiURL } from '../../constants/API_URL';

const NextPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const [data, setData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    pinCode: "",
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
      name: "addressLine1",
      value: data.addressLine1,
      onChange: handleInput,
      style: { ...commonStyleInput },
      placeholder: 'Enter Your Address Line 1'
    },
    {
      key: "2",
      name: "addressLine2",
      value: data.addressLine2,
      onChange: handleInput,
      style: { ...commonStyleInput, marginTop: 20, marginBottom: 20 },
      placeholder: 'Enter Your Address Line 2'
    },
    {
      key: "3",
      name: "city",
      value: data.city,
      onChange: handleInput,
      style: { ...commonStyleInput, marginBottom: 20 },
      placeholder: 'Enter Your City'
    },
    {
      key: "4",
      name: "pinCode",
      value: data.pinCode,
      onChange: handleInput,
      style: { ...commonStyleInput, marginBottom: 30 },
      placeholder: 'Enter Your pinCode'
    }
  ]

  !data.addressLine1 || !data.addressLine2 || !data.pinCode || !data.city ? data.btnDisabled = true : data.btnDisabled = false;

  const handleSubmit = () => {
    const isValidPinCode = pinCodeValidator(data.pinCode);

    if (!isValidPinCode) {
      dispatch(errorOccurred({
        errorMessage: "Pin Code is Invalid !!!"
      }))
      return
    }

    dispatch(storeValuesLastPage({
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      pinCode: data.pinCode,
    }))
  }

  useEffect(() => {
    if (userData.pinCode && userData.errorMessage === "") {
      callAPIOnButtonClick("POST", signUpApiURL, userData).then((backendResponse) => {
        if (backendResponse.statusFromBackend === 200) {
          console.log(backendResponse.dataFromBackend)
        } else {
          console.log(backendResponse.dataFromBackend)
        }
      }).catch(err => console.log(err))
    }
    data.btnDisabled = true
  }, [userData])

  return (
    <div id="form">
      {
        propsArray.map((val) => {
          return (
            <TextInput
              key={val.key}
              name={val.name}
              placeholder={val.placeholder}
              onChange={val.onChange}
              style={val.style}
              value={val.value}
            />
          )
        })
      }
      <Button
        onClick={handleSubmit}
        style={
          data.btnDisabled ?
            { ...commonButtonStyle, marginLeft: "2%" }
            :
            { ...highlightButtonStyle, marginLeft: "2%" }
        }
        disabled={data.btnDisabled}
        title="Save"
      />
    </div>
  )
}

export default NextPage