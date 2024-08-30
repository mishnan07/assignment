import { createSlice } from '@reduxjs/toolkit'


export const dataSlice = createSlice({
  name: 'energy',
  initialState:{
    value:[]
  },
  reducers: {
    datas(state,action){ 
      state.value = action.payload.data
    },
   
  },
})
  
export const { datas } = dataSlice.actions

export default dataSlice.reducer