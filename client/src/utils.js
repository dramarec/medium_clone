import { parse } from 'query-string'

export const limit = 10

export const range = (start, end) => {
    return [...Array(end).keys()].map(el => el + start)
    //[...Array(50).keys()].map(el=>el+10)
}

export const getPaginator = search => {
    const parsedSearch = parse(search)
    const currentPage = parsedSearch.page ? Number(parsedSearch.page) : 1
    const offset = currentPage * limit - limit
    return { currentPage, offset }
}

//! offset => 2 * 10 - 10 = 10
                // 1 - 0
                // 2 - 10
                // 3 - 20