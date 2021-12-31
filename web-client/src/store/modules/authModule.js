import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_ADMIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_ADMIN_REQUEST,
  AUTH_POLICE_SUCCESS,
  AUTH_POLICE_REQUEST
} from '../actions/authAction';
import { USER_REQUEST, USER_ADMIN_REQUEST, USER_POLICE_REQUEST } from "../actions/userAction";
import axios from 'axios';

// const state = {
//   token: localStorage.getItem('token') || '',
//   status: '',
//   hasLoadedOnce: false,
// };
const state = {
    token: localStorage.getItem('token') || '',
    adminToken: localStorage.getItem('adminToken'),
    policeToken: localStorage.getItem('policeToken'),
    status: '',
    hasLoadedOnce: false,
};

const getters = {
  isAuthenticated: state => !!state.token,
  isAdmin: state => state.adminToken,
  isPolice: state => state.policeToken,
  authStatus: state => state.status,
  getToken: state => state.token,
  getAdminToken: state => state.adminToken
};

const actions = {
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST);
      axios.post('http://localhost:3000/auth/login/citizen', user)
        .then(res => {
          localStorage.setItem("token", res.data.data.token);
          axios.defaults.headers.common['Authorization'] = res.data.data.token
          // axios.defaults.headers.common['Authorization'] = resp.token
          commit(AUTH_SUCCESS, res)
          dispatch(USER_REQUEST)
          resolve(res)
        })
        .catch(err => {
          commit(AUTH_ERROR, err)
          localStorage.removeItem("token")
          reject(err)
        })
    })
  },
  [AUTH_ADMIN_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/auth/login/police', user)
        .then(res => {
          localStorage.setItem("adminToken", res.data.data.token);
          axios.defaults.headers.common['Authorization'] = res.data.data.token
          // axios.defaults.headers.common['Authorization'] = resp.token
          commit(AUTH_ADMIN_SUCCESS, res)
          dispatch(USER_ADMIN_REQUEST)
          //state.adminToken = res.data.data.token
          resolve(res)
        })
        .catch(err => {
          //commit(AUTH_ERROR, err)
          localStorage.removeItem("adminToken")
          reject(err)
        })
    })
  },
  [AUTH_POLICE_REQUEST]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/auth/login/police', user)
        .then(res => {
          localStorage.setItem("policeToken", res.data.data.token);
          axios.defaults.headers.common['Authorization'] = res.data.data.token
          // axios.defaults.headers.common['Authorization'] = resp.token
          commit(AUTH_POLICE_SUCCESS, res)
          dispatch(USER_POLICE_REQUEST)
          //state.adminToken = res.data.data.token
          resolve(res)
        })
        .catch(err => {
          //commit(AUTH_ERROR, err)
          localStorage.removeItem("policeToken")
          reject(err)
        })
    })
  },
  [AUTH_LOGOUT]: ({ commit }) => {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem("token")
      resolve()
    })
  },
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, res) => {
    state.status = 'success'
    state.token = res.token
    state.hasLoadedOnce = true
  },
  [AUTH_ADMIN_SUCCESS]: (state, res) => {
    state.adminToken = res.token
  },
  [AUTH_POLICE_SUCCESS]: (state, res) => {
    state.policeToken = res.token
  },
  [AUTH_ERROR]: state => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: state => {
    state.token = ''
  },
};

export default {
  // state,
  state,
  getters,
  actions,
  mutations,
};