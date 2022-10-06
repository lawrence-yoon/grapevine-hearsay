import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import secretService from './secretService'

const initialState = {
    secrets: [],
    hearsay: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//create new secret
export const createSecret = createAsyncThunk('secrets/create', async (secretData, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await secretService.createSecret(secretData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get user secrets

export const getSecrets = createAsyncThunk('secrets/getAll', async(_, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await secretService.getSecrets(token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get hearsay

export const getHearsay = createAsyncThunk('secrets/getHearsay', async(_, thunkAPI)=>{
    try {
        return await secretService.getHearsay()

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//delete user secret
export const deleteSecret = createAsyncThunk('secrets/delete', async(id, thunkAPI)=>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await secretService.deleteSecret(id, token)

    }   catch(error){
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const secretSlice = createSlice({
    name: 'secret',
    initialState,
    reducers: {
        reset: (state)=> initialState
    },
    extraReducers: (builder) =>{
        builder
            .addCase(createSecret.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(createSecret.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.secrets.push(action.payload)
            })
            .addCase(createSecret.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getSecrets.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(getSecrets.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.secrets = action.payload.secrets
            })
            .addCase(getSecrets.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getHearsay.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(getHearsay.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.hearsay = action.payload.hearsay
            })
            .addCase(getHearsay.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteSecret.pending, (state)=>{
                state.isLoading = true
            })
            .addCase(deleteSecret.fulfilled, (state, action)=>{
                state.isLoading = false
                state.isSuccess = true
                state.secrets = state.secrets.filter((secret)=> secret._id !== action.payload.id)
            })
            .addCase(deleteSecret.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = secretSlice.actions
export default secretSlice.reducer