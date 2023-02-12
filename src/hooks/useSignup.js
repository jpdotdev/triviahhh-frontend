import React from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email,password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('https://triviahhh-backend.onrender.com/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok) {
            // Save user credentials to localStorage
            localStorage.setItem('user', JSON.stringify(json))

            //update auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return {signup, isLoading, error}
}