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

export { InsertComment }