/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react'

import { CurrentUserContext } from '../contexts/currentUser'
import useFetch from '../hooks/useFetch'
import useLocalStorage from '../hooks/useLocalStorage'

const CurrentUserChecker = ({ children }) => {
    const [{ response }, doFetch] = useFetch('/users/user')
    const [, setCurrentUserState] = useContext(CurrentUserContext)
    const [token] = useLocalStorage('token')
    console.log("🔥🚀 ===> CurrentUserChecker ===> response", response);

    useEffect(() => {
        console.log('init')
        if (!token) {
            setCurrentUserState(state => ({
                ...state,
                isLoggedIn: false
            }))
            return
        }

        doFetch()
        setCurrentUserState(state => ({
            ...state,
            isLoading: true
        }))
    }, [])

    useEffect(() => {
        if (!response) {
            return
        }

        setCurrentUserState(state => ({
            ...state,
            isLoggedIn: true,
            isLoading: false,
            currentUser: response.data
        }))
    }, [response, setCurrentUserState])
    return children
}

export default CurrentUserChecker