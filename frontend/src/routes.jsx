import { lazy } from "react";

const FirstPage = lazy(() => import("./form/FirstPage"))
const NextPage = lazy(() => import("./form/NextPage"))

const Routes = [
    { path: "/", element: <FirstPage /> },
    { path: "NextPage", element: <NextPage /> },
]

export default Routes