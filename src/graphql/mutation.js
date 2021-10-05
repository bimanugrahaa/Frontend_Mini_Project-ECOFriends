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
mutation MyMutation($ID_COMMENT: Int!, $Comment_post: String!, $isEdited: Boolean!) {
    update_comments_by_pk(pk_columns: {ID_COMMENT: $ID_COMMENT}, _set: {Comment_post: $Comment_post, isEdited: $isEdited}) {
      ID_POST
      ID_COMMENT
      ID_USER
      Comment_post
      isEdited
    }
  }
`

// const UpdateInfoDonate = gql`
// mutation MyMutation($ID_POST: Int!, $Donation_Raised: numeric!) {
//     update_donate_post_by_pk(pk_columns: {ID_POST: $ID_POST}, _set: {Donation_Raised: $Donation_Raised}) {
//       ID_POST
//       Donation_Total
//       Donation_Raised
//     }
//   }
// `

const UpdateInfoDonate = gql`
mutation MyMutation($ID_POST: Int!, $Donation_Raised: numeric!) {
  update_donate_post_by_pk(pk_columns: {ID_POST: $ID_POST}, _inc: {Donates: 1}, _set: {Donation_Raised: $Donation_Raised}) {
    ID_POST
    Donation_Total
    Donation_Raised
    Donates
  }
}
`

const InsertUser = gql`
mutation MyMutation($ID_USER: String!, $email: String!, $name: String!) {
  insert_user_one(object: {ID_USER: $ID_USER, email: $email, name: $name}) {
    ID_USER
    email
    name
  }
}
`

export { InsertComment, DeleteComment, UpdateComment, UpdateInfoDonate, InsertUser }