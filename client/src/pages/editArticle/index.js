import React, { useState, useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'

import ArticleForm from '../../components/articleForm'
import { CurrentUserContext } from '../../contexts/currentUser'
import useFetch from '../../hooks/useFetch'


const EditArticle = ({ match }) => {
    const slug = match.params.slug
    const apiUrl = `/articles/${slug}`
    const [{ response: updateArticleResponse, error: updateArticleError }, doUpdateArticle] = useFetch(apiUrl)
    const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl)
    const [currentUserState] = useContext(CurrentUserContext)
    const [initialValues, setInitialValues] = useState(null)
    const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false)
    console.log("🔥🚀 ===> EditArticle ===> updateArticleError", updateArticleError);

    const onSubmit = article => {
        doUpdateArticle({
            method: 'put',
            data: {
                article
            }
        })
    }

    useEffect(() => {
        doFetchArticle()
    }, [doFetchArticle])

    useEffect(() => {
        if (!fetchArticleResponse) {
            return
        }

        setInitialValues({
            title: fetchArticleResponse.article.title,
            description: fetchArticleResponse.article.description,
            body: fetchArticleResponse.article.body,
            tagList: fetchArticleResponse.article.tagList.join(' ')
        })
    }, [fetchArticleResponse])

    useEffect(() => {
        if (!updateArticleResponse) {
            return
        }
        setIsSuccessfullSubmit(true)
    }, [updateArticleResponse])

    if (currentUserState.isLoggedIn === null) {
        return null
    }

    if (currentUserState.isLoggedIn === false) {
        return <Redirect to="/" />
    }

    if (isSuccessfullSubmit) {
        return <Redirect to={`/articles/${slug}`} />
    }

    return (
        <div>
            <ArticleForm
                onSubmit={onSubmit}
                initialValues={initialValues}
                errors={(updateArticleError && updateArticleError.data.errors) || {}}
            />
        </div>
    )
}

export default EditArticle
