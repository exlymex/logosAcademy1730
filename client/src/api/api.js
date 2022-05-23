import axios from "axios";


const instance = axios.create({
    headers: {
        "Content-Type": "application/json"
    }
})
export const registerAPI = {
    postsUsers({email, password, username}) {
        return instance.post('/api/auth/register', {email, password, username})
            .then(response => {
                return response
            })
            .catch(e => e.response)
    }
}
export const loginAPI = {
    loginUsers({email, password}) {
        return instance.post('/api/auth/login', {email, password})
            .then(response => {
                return response.data
            })
            .catch(e => e.response)
    }
}
// отримую юзерів
export const UsersAPI = {
    getUsers(token) {
        return instance.get('/api/user/users', {headers: {Authorization: `Bearer ${token}`}})
            .then(response => {
                return response
            })
    },
    getDetails(token, userId) {
        return instance.get(`/api/user/details?userId=${userId}`, {headers: {Authorization: `Bearer ${token}`}})
            .then(response => {
                return response
            })
    },
    postDetails(token, userId, detail) {
        return instance.post('/api/user/details/post', {userId, detail}, {headers: {Authorization: `Bearer ${token}`}})
            .then(response => {
                return response
            })
            .catch(e => e.response)
    },
    getFollows(token) {
        return instance.get('/api/user/follow/get', {headers: {Authorization: `Bearer ${token}`}})
            .then(response => {
                return response
            })
            .catch(e => e.response)
    },
    followUser(token, id) {
        return instance.post('/api/user/follow', {id}, {headers: {Authorization: `Bearer ${token}`}})
            .then(response => {
                return response
            })
            .catch(e => e.response)
    }
}
//Провірка чи такий токен валідний
export const checkAPI = {
    checkAuth(token) {
        return instance.post('/api/auth/check', {}, {headers: {Authorization: `Bearer ${token}`}})
            .then(response => {
                return response
            })
    }
}
