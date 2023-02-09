import { useAuthContext } from './useAuthContext'
import { useScoresContext } from './useScoresContext'

export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: scoresDispatch } = useScoresContext()

    const logout = () => {
        // remopve user from localstorage
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
        scoresDispatch({type: 'SET_SCORES', payload: null})
    }

    return {logout}
}