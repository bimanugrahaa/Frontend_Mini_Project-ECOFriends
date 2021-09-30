import { useQuery } from "@apollo/client";
import { GetAllUser, GetUserById } from "../graphql/query";

function useGetAllUser() {
    const {data: userData, error: userError} = useQuery(GetAllUser)

    return {
        userData,
        userError
    }
}

function useGetUserById(ID_USER) {
    const {data: userDataById, error: userErrorById} = useQuery(GetUserById, {
        variables: {ID_USER}
    })
    console.log("ID_USER HOOKS", ID_USER)

    return {
        userDataById,
        userErrorById
    }
}

export { useGetAllUser, useGetUserById }