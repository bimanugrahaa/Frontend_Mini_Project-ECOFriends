import { useLazyQuery, useQuery } from "@apollo/client";
import { GetDonatePost, GetDonatePostById, OrderDonatePostByComments, SearchDonatePost } from "../graphql/query";
import { SubscriptionDonatePost } from "../graphql/subscribe";

function useGetDonatePostById(ID_POST) {
    const {data: detailData, loading: detailLoading, error: detailError} = useQuery(GetDonatePostById, {
        variables: {ID_POST}
    })

    return {
        detailData,
        detailLoading,
        detailError
    }
}

function useGetTrendingDonatePost() {
    const [getTrending, {data: trendingData, loading: trendingLoading, error: trendingError}] = useLazyQuery(OrderDonatePostByComments, {
        variables:{
        }
    })

    return {
        getTrending,
        trendingData,
        trendingLoading,
        trendingError
    }
}

function useGetSearchDonatePost(Title) {
    const [getSearch, {data: searchData, loading: searchLoading}] = useLazyQuery(SearchDonatePost, {
        variables: {Title}
    })

    return {
        getSearch,
        searchData,
        searchLoading
    }
    
}

export { useGetDonatePostById, useGetTrendingDonatePost, useGetSearchDonatePost }