import {createSlice , nanoid} from '@reduxjs/toolkit'

const initialState = {
    user: {name:null,email:null,phone:""} ,
    restaurant:{id:null,accesskey:null}
}

export const userSlice = createSlice({
    name:'users',
    initialState,
    reducers: {
        addUser: (state,action) => {},
        removeUser: (state,action) => {},
        updateUser: (state,action) => {state.user = { ...state.user, ...action.payload };},
        updateRestaurant: (state,action) => {
            state.restaurant = action.payload
        }
    }
})

export const {addUser,removeUser,updateUser,updateRestaurant} = userSlice.actions

export default userSlice.reducer