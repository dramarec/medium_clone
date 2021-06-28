import React, { useEffect } from 'react'
import { stringify } from 'query-string'

import Feed from '../../components/feed'
import Pagination from '../../components/pagination'
import useFetch from '../../hooks/useFetch'
import { getPaginator, limit } from '../../utils'

const GlobalFeed = props => {
    console.log("🔥🚀 ===> props", props);
    const { offset, currentPage } = getPaginator(props.location.search)
    const stringifiedParams = stringify({
        limit,
        offset
    })

    // const apiUrl = '/contacts?limit=5&offset=0'
    // const apiUrl = '/articles?limit=10&offset=0'
    const apiUrl = `/articles?${stringifiedParams}`
    const currentUrl = props.match.url

    const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl)
    // console.log('GlobalFeed res=>', response, error, isLoading)

    useEffect(() => {
        doFetch()
    }, [doFetch, currentPage])

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
                                <Pagination
                                    total={response.articlesCount}
                                    limit={limit}
                                    url={currentUrl}
                                    currentPage={currentPage}
                                    // моковые данные 🙂
                                    // limit={10}
                                    // url='/'
                                    // currentPage={2}
                                />
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
