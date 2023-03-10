import React from 'react';



const InitialState ={
    isLoading: true,
    isSignout: false,
    userToken: null,
    profile:null,
}

export const AuthCtx = React.createContext({InitialState});

export default function auth(state, action) {
  
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...state,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...state,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...state,
            isSignout: true,
            userToken: null,
          };
          case 'SET_PROFILE':
          return {
            ...state,
            profile: action.profile,
           
          };
          default:{
            return {
            ...state
            }
          }
      }
    }
  
