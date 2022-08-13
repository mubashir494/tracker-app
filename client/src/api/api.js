import axios from "axios"
const URL = "https://tracker-employee.herokuapp.com"

axios.interceptors.request.use((request) => {
    if(localStorage.getItem('item')){
        request.headers.token = JSON.parse(localStorage.getItem('item')).token;
        return request
    }
    return request;
})
export const createJourney = async (obj) => {
 
    const p1 = await axios.post(`${URL}/trip/createTrip`,{ "start": obj.start, "status": obj.status, "route": obj.start })
    const p2 = await axios.post(`${URL}/journey/createJourney`,{ "userId": obj.userId, "startCoordinates": obj.start, "status": obj.status, "trip": [p1.data._id] })
    return {"trip" : p1.data,"journey" : p2.data.createdJourney}
}
export const createTrip = async (obj) =>{
    const p1 = await axios.post(`${URL}/trip/createTrip`,{ "start": obj.start, "status": obj.status, "route": obj.start })
    const p2 = await axios.post(`${URL}/journey/addTrip`,{"tripId":p1.data._id,"id" : obj.currentJourney})
    return p1.data    
}

export const login = async (obj) => {
    return axios.post(`${URL}/user/login`, obj)

}

export const sendEmail = async (obj) =>{

    return axios.post(`${URL}/user/sendEmail`,obj)
}
export const getUserById = async (obj) => {
    return axios.post(`${URL}/user/getUserById`,obj)
}
export const authenticateUser = async (obj) =>{
    return axios.post(`${URL}/user/authenticateUser`,obj)
}

export const registerUser = async (obj) =>{
    return axios.post(`${URL}/user/register`,obj)
}
export const isLoggedIn = async (token) => {

    return axios.post(`${URL}/user/`, null, {
        headers: {
            'token': token,
        }
    })

}


export const getStatusByuserId = async (obj) => {
    return axios.post(`${URL}/status/getStatusByuserId`, { "userId": obj.userId })
}

export const updateStatus = async (obj) => {
    const response = await axios.post(`${URL}/status/updateStatus`, obj)
    return response
}
export const updateCurrentJourney = async (obj) => {

    const response = await axios.post(`${URL}/status/updateCurrentJourney`, obj)
    return response
}
export const updateCurrentTrip = async (obj) => {
 
    const response = axios.post(`${URL}/status/updateCurrentTrip`, obj)
    return response
}


export const updateTripStatus = async (obj) =>{
    const response = await axios.post(`${URL}/trip/changestatus`,obj)
    return response
}

export const endTrip = async (obj) =>{
    const response = await axios.post(`${URL}/trip/endTrip`,obj)
    return response
}
export const updateJourneyStatus = async (obj) =>{

    const response = await axios.post(`${URL}/journey/changeStatus`,obj)
    return response
}

export const endJourney = async (obj) => {
    const response = await axios.post(`${URL}/journey/endJourney`,obj)
    return response
}

export const getTripById = async (obj)=>{
    const response = await axios.post(`${URL}/trip/getTripById`,obj)
    return response;
}

export const createStatus = async (obj) => {
    const response = await axios.post(`${URL}/status/createStatus`,obj)
    return response
}
export const getJourneyById = async (obj) =>{

    const response = await axios.post(`${URL}/journey/getJourneyById`,obj)
    return response;
}




export const getAllJourney = async(obj) =>{
    const response = await axios.post(`${URL}/journey/getAllJourney`)
    return response
} 
export const getActiveJourney = async(obj) =>{
    const response = await axios.post(`${URL}/journey/getActiveJourney`)
    return response
} 
export const getBreakJourney = async(obj) =>{
    const response = await axios.post(`${URL}/journey/getBreakJourney`)
    return response
}

export const getCompletedJourney = async(obj) =>{
    const response = await axios.post(`${URL}/journey/getCompletedJourney`)
    return response
}
export const getCompletedJourneyById = async(obj) =>{
    const response = await axios.post(`${URL}/journey/getCompletedJourneyById`,obj)
    return response
}

export const getAllUserStatus = async (obj) =>{
    const response = await axios.post(`${URL}/status/getAllUserStatus`)
    return response
}

export const getPausedJourneyById = async (obj) =>{

    const response = await axios.post(`${URL}/journey/getPausedJourneyById`,obj)
    return response
}


export const startJourney = async (obj) => {

    const response = await axios.post(`${URL}/journey/startJourney`,obj)
    return response;
}
export const breakJourney = async (obj) => {

    const response = await axios.post(`${URL}/journey/breakJourney`,obj)
    return response;
}
export const resumeJourney = async (obj) => {
    const response = await axios.post(`${URL}/journey/resumeJourney`,obj)
    return response
}
export const endJourn = async (obj) =>{
    const response = await axios.post(`${URL}/journey/endJourneys`,obj)
    return response
}
export const getJourneyByTripId = async (obj) => {
    const response = await axios.post(`${URL}/journey/getJourneyByTripId`,obj)
    return response

}