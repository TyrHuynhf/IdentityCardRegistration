import { USER_REQUEST, USER_ERROR, USER_SUCCESS , USER_ADMIN_REQUEST, USER_POLICE_REQUEST} from "../actions/userAction";
import Vue from "vue";
import {  AUTH_LOGOUT } from '../actions/authAction'
import axios from 'axios'

const state = { status: "", profile: localStorage.getItem('user') || {}, adminProfile: localStorage.getItem('adminUser') };

// const getters = {
//   getProfile: state => state.profile,
//   getStatus: state => state.status,
//   // isProfileLoaded: state => !!state.profile.fullName,
// };
const getters = {
  getProfile: state => state.profile,
  getStatus: state => state.status,
  getAdminProfile: state => state.adminProfile
};

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }) => {
    commit(USER_REQUEST);
    axios.get('http://localhost:3000/users/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => {
        const user = res.data
        localStorage.setItem('user', JSON.stringify(user))
        // commit(USER_SUCCESS, res)
        state.status = "success";
        // Vue.set(state, "profile", (res.data))
        state.profile = res.data
        console.log(state.profile)
      })
      .catch(err => {
        commit(USER_ERROR);
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT);
      })
  },
  [USER_ADMIN_REQUEST]: ({ commit, dispatch }) => {
    commit(USER_REQUEST);
    axios.get('http://localhost:3000/users/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
      },
    })
      .then(res => {
        const user = res.data
        localStorage.setItem('adminUser', JSON.stringify(user))
        // commit(USER_SUCCESS, res)
        //state.status = "success";
        // Vue.set(state, "profile", (res.data))
        //state.profile = res.data
        //console.log(state.profile)
      })
      .catch(err => {
        commit(USER_ERROR);
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT);
      })
  },
  [USER_POLICE_REQUEST]: ({ commit, dispatch }) => {
    commit(USER_REQUEST);
    axios.get('http://localhost:3000/users/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('policeToken')}`,
      },
    })
      .then(res => {
        const user = res.data
        localStorage.setItem('policeUser', JSON.stringify(user))
        // commit(USER_SUCCESS, res)
        //state.status = "success";
        // Vue.set(state, "profile", (res.data))
        //state.profile = res.data
        //console.log(state.profile)
      })
      .catch(err => {
        commit(USER_ERROR);
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT);
      })
  }
}

const mutations = {
  [USER_REQUEST]: state => {
    state.status = "loading";
  },
  [USER_SUCCESS]: async (state, res) => {
    state.status = "success";
    //Vue.set(state, "profile", JSON.stringify(res.data))
     state.profile = res.data
  },
  [USER_ERROR]: state => {
    state.status = "error";
  },
  [AUTH_LOGOUT]: state => {
    state.profile = {};
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};