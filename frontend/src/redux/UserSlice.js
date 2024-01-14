import { createSlice } from "@reduxjs/toolkit"

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
        errorMessage:""
    },
    reducers: {
        storeValuesFirstPage: (state, action) => {
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.phoneNumber = action.payload.phoneNumber;
            state.password = action.payload.password;
        },
        storeValuesLastPage: (state, action) => {
            state.addressLine1 = action.payload.addressLine1;
            state.addressLine2 = action.payload.addressLine2;
            state.city = action.payload.city;
            state.pinCode = action.payload.pinCode;
        },
        errorOccurred:(state,action)=>{
            state.errorMessage = action.payload.errorMessage;
        }
    }
})

export const { storeValuesFirstPage, storeValuesLastPage,errorOccurred } = userSlice.actions;
export default userSlice.reducer;

