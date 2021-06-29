import { useEffect, useContext } from 'react'

import { CurrentUserContext } from '../contexts/currentUser'
import useFetch from '../hooks/useFetch'
import useLocalStorage from '../hooks/useLocalStorage'

const CurrentUserChecker = ({ children }) => {
    // const [, setCurrentUserState] = useContext(CurrentUserContext)
    const [, dispatch] = useContext(CurrentUserContext)
    const [{ response }, doFetch] = useFetch('/user')// const [{ response }, doFetch] = useFetch('/users/current')
    const [token] = useLocalStorage('token')

    useEffect(() => {
        if (!token) {
            dispatch({ type: 'SET_UNAUTHORIZED' })
            // setCurrentUserState(state => ({
            //     ...state,
            //     isLoggedIn: false
            // }))
            return
        }

        doFetch()
        dispatch({ type: 'LOADING' })

        // setCurrentUserState(state => ({
        //     ...state,
        //     isLoading: true
        // }))
        // }, [doFetch, setCurrentUserState, token])
    }, [doFetch, dispatch, token])

    useEffect(() => {
        if (!response) {
            return
        }

        // setCurrentUserState(state => ({
        //     ...state,
        //     isLoggedIn: true,
        //     isLoading: false,
        //     // currentUser: response.data
        //     currentUser: response.user
        // }))
        dispatch({ type: 'SET_AUTHORIZED', payload: response.user })
    }, [response, dispatch])
    return children
}

export default CurrentUserChecker
