import { userManager } from '@/lib/auth';
import { User } from 'oidc-client-ts';
import React, { createContext, useContext, useReducer, ReactNode, useMemo, useState, useEffect } from 'react';

// Define the shape of the user object
interface CustomUser extends User {
    authorities?: Array<string>;
}
// Define the state shape
interface UserState {
    user: CustomUser | User | null;
}

// Define action types
type UserAction =
    | { type: 'SET_USER'; payload: CustomUser }
    | { type: 'CLEAR_USER' };

// Create a context for user data
const UserContext = createContext<{ state: UserState; dispatch: React.Dispatch<UserAction> } | undefined>(undefined);

// Create a reducer function to manage user state
const userReducer = (state: UserState, action: UserAction): UserState => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'CLEAR_USER':
            return { ...state, user: null };
        default:
            return state;
    }
};

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(userReducer, { user: null });
    useEffect(
        ()=>{
          const loadData=  async () =>   {
            const data= await userManager.getUser().then(user => user);
            if(data) dispatch({type: 'SET_USER', payload:data});
            console.log(data?.profile?.authorities);
          }
          loadData();
        }
    ,[]);
    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useUser = (): { state: UserState; dispatch: React.Dispatch<UserAction> } => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    //[state, dispatch]
    return context;
};

export default UserProvider;