import { createContext, useReducer, useContext } from 'react'

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.payload
    case 'HIDE':
      return ''
    case 'SHOW_WITH_TIMEOUT':
      return action.payload
    default:
      return state
  }
}

export const NotificationProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, '')

  const showNoticationWithTimeout = (message, timeout) => {
    dispatch({ type: 'SHOW', payload: message })
    setTimeout(() => {
      dispatch({ type: 'HIDE' })
    }, timeout)
  }

  return (
    <NotificationContext.Provider
      value={[notification, showNoticationWithTimeout]}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('Must be used within a NotificationProvider')
  }
  return context
}
