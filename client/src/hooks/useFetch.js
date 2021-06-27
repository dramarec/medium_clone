import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import useLocalStorage from './useLocalStorage'

const useFetch = url => {
    // const baseUrl = 'https://teamproject-book-read.herokuapp.com/api'
    // const baseUrl = 'https://localhost:4000/api/users'
    const baseUrl = 'http://localhost:4000/api/users'
    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState({})
    const [token] = useLocalStorage('token')

    const doFetch = useCallback((options = {}) => {
        setOptions(options)
        setIsLoading(true)
    }, [])

    useEffect(() => {
        if (!isLoading) {
            return
        }

        const requestOptions = {
            ...options,
            ...{
                headers: {
                    authorization: token ? `Bearer ${token}` : ''
                }
            }
        }

        axios(baseUrl + url, requestOptions)
            .then(res => {
                setResponse(res.data)
                setIsLoading(false)
            })
            .catch(error => {
                setError(error.response.data)
                setIsLoading(false)
            })

    }, [isLoading, options, token, url])

    return [{ isLoading, response, error }, doFetch]
}
export default useFetch