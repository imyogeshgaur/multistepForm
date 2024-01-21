import { decode } from "jsonwebtoken";

const decodeUser = (token: any) => {
    try {
        const user = decode(token, { complete: true });
        return user?.payload;
    } catch (error) {
        console.log("User Decode Error : ", error);
    }
}

export default decodeUser