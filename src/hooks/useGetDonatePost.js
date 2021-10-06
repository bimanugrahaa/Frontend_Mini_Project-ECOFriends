import { useLazyQuery, useQuery } from "@apollo/client";
import { GetDonatePost, GetDonatePostById, OrderDonatePostByComments, SearchDonatePost } from "../graphql/query";
import { SubscriptionDonatePost } from "../graphql/subscribe";

// function useGetDonatePost() {
//     const {data, loading, error, subscribeToMore} = useQuery(GetDonatePost);

//     const subscribePassenger = () => {
//         subscribeToMore({
//             document: SubscriptionDonatePost,
//             updateQuery: (prev, {subscriptionData: {data}}) => {
//                 return data
//             }
//         })
//     }

//     return {
//         post: data? data.donate_post : [],
//         loading,
//         error,
//         subscribePassenger
//     }
// }

function useGetDonatePostById(ID_POST) {
    const {data: detailData, loading: detailLoading, error: detailError} = useQuery(GetDonatePostById, {
        variables: {ID_POST}
    })
    console.log("ID_POST HOOKS", ID_POST)

    return {
        detailData,
        detailLoading,
        detailError
    }
}

function useGetTrendingDonatePost() {
    const [getTrending, {data: trendingData, loading: trendingLoading, error: trendingError}] = useLazyQuery(OrderDonatePostByComments, {
        variables:{}
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