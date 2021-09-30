import { useSubscription } from "@apollo/client";
import { SubscriptionInfo } from "../graphql/subscribe";

export default function useSubscribeInfo(ID_POST) {
    const {data: infoData, loading: infoLoading, error:infoError} = useSubscription(SubscriptionInfo, {
        variables: {
            ID_POST
        }
    })

    return {
        infoData,
        infoLoading,
        infoError
    }
}