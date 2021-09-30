import { gql } from '@apollo/client'

const InsertComment = gql`
mutation MyMutation($object: comments_insert_input!) {
    insert_comments_one(object: $object) {
      ID_POST
      ID_USER
      Comment_post
    }
  }
`

const DeleteComment = gql`
mutation MyMutation($ID_COMMENT: Int!) {
    delete_comments_by_pk(ID_COMMENT: $ID_COMMENT) {
      ID_POST
      ID_COMMENT
      ID_USER
      Comment_post
    }
  }
`

const UpdateComment = gql`
mutation MyMutation($ID_COMMENT: Int!, $Comment_post: String!) {
    update_comments_by_pk(pk_columns: {ID_COMMENT: $ID_COMMENT}, _set: {Comment_post: $Comment_post}) {
      ID_POST
      ID_COMMENT
      ID_USER
      Comment_post
    }
  }
`

const UpdateInfoDonate = gql`
mutation MyMutation($ID_POST: Int!, $Donation_Raised: Int!) {
    update_donate_post_by_pk(pk_columns: {ID_POST: $ID_POST}, _set: {Donation_Raised: $Donation_Raised}) {
      ID_POST
      Donation_Total
      Donation_Raised
    }
  }
`

export { InsertComment, DeleteComment, UpdateComment, UpdateInfoDonate }