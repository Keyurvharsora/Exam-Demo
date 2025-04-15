import React from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const ErrorBoundary = () => {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        if (error.status === 404) {
          return <h1>This page doesn't exist!</h1>;
        }
    
        if (error.status === 401) {
          return <h1>You aren't authorized to see this</h1>;
        }
    
        if (error.status === 503) {
          return <h1>Looks like our API is down</h1>;
        }
        
      }
    
      return <h1>Something went wrong</h1>;
}

export default ErrorBoundary
