import React, { useEffect } from 'react'
import Feed from '../../components/feed'
import useFetch from '../../hooks/useFetch'

const GlobalFeed = () => {
    const apiUrl = '/articles?limit=10&offset=0'
    // const apiUrl = '/contacts?limit=5&offset=0'
    const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl)
    console.log('GlobalFeed res=>', response, error, isLoading)

    useEffect(() => {
        doFetch()
    }, [doFetch])

    return (
        <div className="home-page">
            <div className="banner">
                <h1>Medium Clone</h1>
                <p>A place to share knowledge</p>
            </div>
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        {isLoading && <div>Loading...</div>}
                        {error && <div>Some error happened</div>}
                        {!isLoading && response && (
                            <>
                                {/* <Feed articles={response.data.contacts} /> */}
                                <Feed articles={response.articles} />
                            </>
                        )}
                    </div>
                    <div className="col-md-3">Popular tags</div>
                </div>
            </div>
        </div>
    )
}

export default GlobalFeed;