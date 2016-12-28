import {getFriends, getSubscribing } from './../../api/auth'

const ADD_USER = 'ADD_USER'
const ADD_MULTIPLE_USERS = 'ADD_MULTIPLE_USERS'
const USER_ONBOARDED = 'USER_ONBOARDED'
const UPDATE_FRIENDS = 'UPDATE_FRIENDS'
const UPDATE_SUBSCRIBING = 'UPDATE_SUBSCRIBING'

export function addUser(id, user) {
  return {
    type: ADD_USER,
    id,
    user,
  }
}


function updateFriends(friends){ 
  return {
    type: UPDATE_FRIENDS,
    friends
  }
}
function updateSubscribing(subscribing){ 
  return {
    type: UPDATE_SUBSCRIBING,
    subscribing
  }
}

export function friends(){
  return  function (dispatch) { 
    return getFriends()
      .then(function(friends){ 
        dispatch(updateFriends(friends));
      })
  }
}

export function subscribing(){
  return function (dispatch) {  
    return getSubscribing()
      .then(function(subscribing){ 
        dispatch(updateSubscribing(subscribing));
      })
  }
}

export function addMultipleUsers (users) {
  return {
    type: ADD_MULTIPLE_USERS,
    users,
  }
}
export function userOnboarded(){
  return {
    type: USER_ONBOARDED
  }
}

// this state is for isNew. 
const initialState = {
  isNew: true,
}

export default function users (state = {}, action) { 
  switch (action.type) {
    case UPDATE_FRIENDS:
      return {
        ...state,
        friends: action.friends
      }
    case UPDATE_SUBSCRIBING:{
      return {
        ...state,
        subscribing: action.subscribing
      }
    }
    case ADD_USER :
      return {
        ...state,
        [action.id]: action.user,
        isNew: false,
      }
    case ADD_MULTIPLE_USERS :
      return {
        ...state,
        ...action.users,
      }
    case USER_ONBOARDED:
      return {
        ...state,
        isNew: false
      }
    default :
      return state
  }
}