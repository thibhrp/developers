import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { debounce } from '../utils/debounce'
import Search from '../components/Search.tsx'
import { getMovieSearch } from '../../domain/services/movie.service.ts'
import { MovieSearchResult } from '../../domain/interfaces/movie.interface.ts'
import MovieList from '../components/MovieList.tsx'
import Pagination from '../components/Pagination.tsx'
import { getInitialSearchResult } from '../utils/getInitialSearchResult.ts'
import Loading from '../components/Loading.tsx'

function Home() {
    const [queryParams, setSearchParams] = useSearchParams()

    const [searchResult, setSearchResult] = useState<MovieSearchResult>(
        getInitialSearchResult()
    )
    const [query, setQuery] = useState<string>(queryParams.get('query') || '')
    const [page, setPage] = useState<number>(
        parseInt(queryParams.get('page') || '1', 10)
    )
    const [hasError, setHasError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const showPagination: boolean = searchResult?.total_pages > 1 || false

    const onSearch = (query: string) => {
        if (hasError) {
            setHasError(false)
        }
        setQuery(query)
    }

    const getContent = () => {
        if (hasError) {
            return <strong>Something went wrong...</strong>
        }

        // TODO add empty state

        return <MovieList movies={searchResult.results} />
    }

    /*
     * useEffect to fetch the movie list when the query or page changes
     * The list is also fetched when you land on the page and there are some query params
     * (Not the best way as you have to refetch the all list when you came back from the movie detail page)
     */
    useEffect(() => {
        const searchMovie = async () => {
            if (!query) {
                return
            }

            try {
                setIsLoading(true)
                const list = await getMovieSearch({ query, page })
                setSearchResult(list)
            } catch (error) {
                setHasError(true)
            } finally {
                setIsLoading(false)
            }
        }

        setSearchParams({ query, page: `${page}` })
        searchMovie()
    }, [query, page, setSearchParams])

    return (
        <>
            {isLoading && <Loading />}
            <Search query={query} onSearch={debounce(onSearch, 500)} />
            {getContent()}
            {showPagination && (
                <Pagination
                    page={page}
                    totalPages={searchResult.total_pages}
                    onPageChange={setPage}
                />
            )}
        </>
    )
}

export default Home
