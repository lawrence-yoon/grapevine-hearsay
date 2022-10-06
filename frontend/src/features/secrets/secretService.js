import axios from 'axios'
const API_URL = '/api/secrets/'

//create new secret
const createSecret = async (secretData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, secretData, config)
    return response.data
}

//get user secrets
const getSecrets = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    return response.data
}

//get hearsay
const getHearsay = async () => {
    const response = await axios.get(API_URL + "hearsay")
    return response.data
}

//delete user secret
const deleteSecret = async (id, token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + id, config)
    return response.data
}

const secretService = {
    createSecret,
    getSecrets,
    getHearsay,
    deleteSecret
}

export default secretService