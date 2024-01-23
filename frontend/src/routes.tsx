import { lazy } from "react";

const FirstPage = lazy(() => import("./pages/signUpPage/FirstPage"))
const NextPage = lazy(() => import("./pages/signUpPage/NextPage"))
const LoginPage = lazy(() => import("./pages/loginPage/LoginPage"))
const ForgetPasswordPage = lazy(() => import("./pages/forgotPage/ForgetPage"))
const ResetPasswordPage = lazy(() => import("./pages/resetPage/ResetPage"))
const MainPage = lazy(() => import("./pages/mainPage/MainPage"))

const Routes = [
    { path: "/", element: <LoginPage /> },
    { path: "/Register", element: <FirstPage /> },
    { path: "/NextPage", element: <NextPage /> },
    { path: "/forgetPassword", element: <ForgetPasswordPage /> },
    { path: "/resetPassword/:userId", element: <ResetPasswordPage /> },
    { path: "/welcome", element: <MainPage /> }
]

export default Routes