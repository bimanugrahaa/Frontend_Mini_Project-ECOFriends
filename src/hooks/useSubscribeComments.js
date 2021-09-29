import { useSubscription } from "@apollo/client";
import { SubscriptionComments } from "../graphql/subscribe";

export default function useSubscribeComments(ID_POST) {
    const {data: commentsData, loading: commentsLoading, error:commentsError} = useSubscription(SubscriptionComments, {
        variables: {
            ID_POST
        }
    })

    return {
        commentsData,
        commentsLoading,
        commentsError
    }
}