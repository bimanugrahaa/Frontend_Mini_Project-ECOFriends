import { useLazyQuery, useQuery } from "@apollo/client";
import { GetDonatePost, GetDonatePostById } from "../graphql/query";
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

export { useGetDonatePostById }