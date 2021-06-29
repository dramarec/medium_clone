import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'

import useFetch from '../../hooks/useFetch'
import ArticleForm from '../../components/articleForm'
import { CurrentUserContext } from '../../contexts/currentUser'

const CreateArticle = () => {
    const apiUrl = '/articles'
    const [{ response, error }, doFetch] = useFetch(apiUrl)
    const [currentUserState] = useContext(CurrentUserContext)
    console.log("🔥🚀 ===> CreateArticle ===> currentUserState", currentUserState);

    const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)

    const onSubmit = article => {
        // console.log("🔥🚀 ===> CreateArticle ===> article", article);
        doFetch({
            method: 'post',
            data: {
                article
            }
        })
    }

    const initialValues = {
        title: '',
        description: '',
        body: '',
        tagList: ''
    }

    useEffect(() => {
        if (!response) {
            return
        }
        setIsSuccessfullSubmit(true)
    }, [response])

    if (currentUserState.isLoggedIn === null) {
        return null
    }

    // if (!isSuccessfullSubmit || currentUserState.isLoggedIn === false) {
    //     return <Redirect to="/" />
    // }
    if (currentUserState.isLoggedIn === null) {
        return <Redirect to="/" />
    }

    if (isSuccessfullSubmit) {
        return <Redirect to={`/articles/${response.article.slug}`} />
    }

    return (
        <div>
            <ArticleForm
                onSubmit={onSubmit}
                initialValues={initialValues}
                errors={(error && error.data.errors) || {}}

            />
        </div>
    )
}

export default CreateArticle
