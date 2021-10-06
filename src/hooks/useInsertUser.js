import { useMutation } from "@apollo/client";
import { InsertUser } from "../graphql/mutation";

export default function useInsertUser() {
    const [insertUser, {loading: loadingInsertUser}] = useMutation(InsertUser)
    
    return {
        insertUser,
        loadingInsertUser
    }
}