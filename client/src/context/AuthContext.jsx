import React, { createContext } from 'react'

export const authDataContext = createContext();



const AuthContext = ({children}) => {

  const serverURL = "http://localhost:4000";

  let value = {
    serverURL
  }
  return (
    <div>
      <authDataContext.Provider value={value}>
      {children}
      </authDataContext.Provider>
    </div>
  )
}

export default AuthContext