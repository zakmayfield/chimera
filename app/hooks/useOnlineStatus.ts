import * as React from 'react'

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = React.useState(false)

  React.useEffect(() => {
    function handleOnline () {
      setIsOnline(true)
    }
    function handleOffline () {
      setIsOnline(false)
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}