import { useMutation } from "@apollo/client";
import { InsertComment } from "../graphql/mutation";

export default function useInsertComment() {
    const [insertComment, {loading: loadingInsertComment}] = useMutation(InsertComment)
    
    return {
        insertComment,
        loadingInsertComment
    }
}