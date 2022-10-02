import React, { createContext, useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage.jsx';


export const LocalStorageContext = createContext({
  scrollPosition: 0,
})

export const LocalStorageProvider = ({children}) => {
  const [scrollPosition, setScrollPosition] = useLocalStorage('scroll', 0);

  const value = {
    scrollPosition,
    setScrollPosition
  }

  return(<LocalStorageContext.Provider value={value} >{children}</LocalStorageContext.Provider>)
}