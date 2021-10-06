import { useMutation } from "@apollo/client";
import { UpdateInfoDonate } from "../graphql/mutation";

export default function useUpdateInfoDonate() {
    const [updateInfoDonate, {loading: loadingInfoDonate}] = useMutation(UpdateInfoDonate);

    return {
        updateInfoDonate,
        loadingInfoDonate
    }
}