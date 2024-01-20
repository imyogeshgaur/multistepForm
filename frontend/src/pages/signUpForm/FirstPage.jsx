import { useState, useEffect } from 'react'
import { phoneNumberValidator, passwordValidator, emailValidator } from '../../validator/Validator'
import { useDispatch, useSelector } from 'react-redux'
import { errorOccurred, storeValuesFirstPage } from '../../redux/UserSlice'
import { useNavigate } from 'react-router'
import TextInput from '../../components/TextInput'
import Button from '../../components/Button'
import { commonButtonStyle, commonStyleInput, highlightButtonStyle, registerLoginLinkStyle } from '../../style/CommonStyle'
import TextLink from '../../components/TextLink'

const FirstPage = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [data, setData] = useState({
        nameOfUser: "",
        emailOfUser: "",
        phoneNumber: "",
        password: "",
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
            name: "nameOfUser",
            value: data.nameOfUser,
            onChange: handleInput,
            style: { ...commonStyleInput },
            placeholder: "Enter Your Full Name"
        },
        {
            key: "2",
            name: "emailOfUser",
            value: data.emailOfUser,
            onChange: handleInput,
            style: { ...commonStyleInput, marginTop: 20, marginBottom: 20 },
            placeholder: "Enter Your Email"
        },
        {
            key: "3",
            type: "tel",
            name: "phoneNumber",
            value: data.phoneNumber,
            onChange: handleInput,
            style: { ...commonStyleInput, marginBottom: 20 },
            placeholder: 'Enter Your Phone Number'
        },
        {
            key: "4",
            type: "password",
            name: "password",
            value: data.password,
            onChange: handleInput,
            style: { ...commonStyleInput, marginBottom: 30 },
            placeholder: 'Enter Your Password',
        }
    ]

    !data.nameOfUser || !data.emailOfUser || !data.password || !data.phoneNumber ? data.btnDisabled = true : data.btnDisabled = false;

    const handleSubmit = () => {
        const isValidEmail = emailValidator(data.emailOfUser);
        const isValidPhone = phoneNumberValidator(data.phoneNumber);
        const isValidPassword = passwordValidator(data.password);

        if (!isValidEmail) dispatch(errorOccurred({
            errorMessage: "Invalid Email !!!"
        }))
        if (!isValidPhone) dispatch(errorOccurred({
            errorMessage: "Invalid Phone !!!"
        }))
        if ((!isValidPassword)) dispatch(errorOccurred({
            errorMessage: "Invalid Password !!!"
        }))

        dispatch(storeValuesFirstPage({
            nameOfUser: data.nameOfUser,
            emailOfUser: data.emailOfUser,
            phoneNumber: data.phoneNumber,
            password: data.password,
        }))

        if (userData.errorMessage === "") dispatch(errorOccurred({
            errorMessage: ""
        }))
    }

    useEffect(() => {
        userData.password && userData.errorMessage === ""
            ?
            navigate("/NextPage")
            :
            navigate("/Register")
    }, [userData]);

    return (
        <div id="form">
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
                        { ...commonButtonStyle, marginLeft: "3%" }
                        :
                        { ...highlightButtonStyle, marginLeft: "2%" }
                }
                disabled={data.btnDisabled}
                title="Continue"
            />

            <TextLink
                textStyle={registerLoginLinkStyle.textStyle}
                text={"Already have account? "}
                linkStyle={registerLoginLinkStyle.linkStyle}
                linkText={"Sign In Here"}
                navigateTo={"/"}
            />
        </div>
    )
}

export default FirstPage