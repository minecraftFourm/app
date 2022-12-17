import React, { createContext, useContext, useState } from 'react'

const UserProvider = createContext();
const SetUserProvider = createContext();

export const UseUser = () => useContext(UserProvider)
export const UseSetUser = () => useContext(SetUserProvider)

export const UserContext = ({children}) => {
    const [ user, setUser ] = useState({
        id: '',
        username: '',
        isAuthenticated: false,
    })

    const updateUser = (val) => {
        setUser(prevValue => {
            return {
                ...prevValue,
                ...val
            }
        })
    }

  return (
    <UserProvider.Provider value={user}>
        <SetUserProvider.Provider value={updateUser}>
            {children}
        </SetUserProvider.Provider>
    </UserProvider.Provider>
  )
}

export default UserContext