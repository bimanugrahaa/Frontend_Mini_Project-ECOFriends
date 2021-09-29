import { useSubscription } from "@apollo/client";
import { SubscriptionDonatePost } from "../graphql/subscribe";

export default function useSubscribeDonatePost() {
    const {data, loading, error} = useSubscription(SubscriptionDonatePost)

    return {
        data,
        loading,
        error
    }
}