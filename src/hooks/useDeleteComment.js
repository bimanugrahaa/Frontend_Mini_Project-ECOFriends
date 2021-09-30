import { useMutation } from "@apollo/client";
import { DeleteComment } from "../graphql/mutation";

export default function useDeleteComment() {
    const [deleteComment, {loading: loadingDeleteComment}] = useMutation(DeleteComment)
    
    return {
        deleteComment,
        loadingDeleteComment
    }
}