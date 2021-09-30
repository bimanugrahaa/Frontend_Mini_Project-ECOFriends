import { useMutation } from "@apollo/client";
import { UpdateInfoDonate } from "../graphql/mutation";
// import { GetPassengerList } from "../graphql/query";

export default function useUpdateInfoDonate() {
    const [updateInfoDonate, {loading: loadingInfoDonate}] = useMutation(UpdateInfoDonate);

    return {
        updateInfoDonate,
        loadingInfoDonate
    }
}