import { useMutation } from "@apollo/client";
import { UpdateComment } from "../graphql/mutation";
// import { GetPassengerList } from "../graphql/query";

export default function useUpdateComment() {
    const [updateComment, {loading: loadingUpdateComment}] = useMutation(UpdateComment);

    return {
        updateComment,
        loadingUpdateComment
    }
}