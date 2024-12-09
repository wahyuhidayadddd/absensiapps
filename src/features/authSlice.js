import { createSlice} from '@reduxjs/toolkit'

const initialState = {

    token:null,
    user:null,
    loading:false,
    error:null,

}
const authSlice = createSlice({
    name :'auth',
    initialState,
    reducers:{
        loginStart:(state) =>{
            state.loading = true
        },
        loginSuccess: (state,action) =>{
            state.loading = false;
            state.token = action.payload.token;
            state.user = action.payload.user
        },
        loginFailure: (state,action) => {
            state.loading = false;
            state.error = action.payload
        },
        logout: (state) => {
            state.token = null;
            state.user = null
        }
    }
})

export const {loginStart,loginSuccess,loginFailure,logout} = authSlice.actions
export default authSlice.reducer