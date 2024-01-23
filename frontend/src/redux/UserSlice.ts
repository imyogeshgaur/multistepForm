import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UserState {
    nameOfUser: string;
    emailOfUser: string;
    phoneNumber: string;
    password: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    pinCode: string;
    errorMessage: string;
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        nameOfUser: "",
        emailOfUser: "",
        phoneNumber: "",
        password: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        pinCode: "",
        errorMessage: ""
    },
    reducers: {
        storeValuesFirstPage: (state: UserState, action: PayloadAction<{ nameOfUser: string; emailOfUser: string; phoneNumber: string; password: string }>) => {
            state.nameOfUser = action.payload.nameOfUser;
            state.emailOfUser = action.payload.emailOfUser;
            state.phoneNumber = action.payload.phoneNumber;
            state.password = action.payload.password;
        },
        storeValuesLastPage: (state: UserState, action: PayloadAction<{ addressLine1: string; addressLine2: string; city: string; pinCode: string }>) => {
            state.addressLine1 = action.payload.addressLine1;
            state.addressLine2 = action.payload.addressLine2;
            state.city = action.payload.city;
            state.pinCode = action.payload.pinCode;
        },
    }
})

export const { storeValuesFirstPage, storeValuesLastPage } = userSlice.actions;
export default userSlice.reducer;

