import { gql } from '@apollo/client'

const GetDonatePost = gql`
query MyQuery {
    donate_post {
      ID_POST
      Title
      Subtitle
      Description
      Donation_Total
      Donation_Raised
      IMAGE_URL
    }
  }
`

const GetDonatePostById = gql`
query MyQuery($ID_POST: Int!) {
    donate_post(where: {ID_POST: {_eq: $ID_POST}}) {
      ID_POST
      Title
      Subtitle
      Description
      Donation_Total
      Donation_Raised
      IMAGE_URL
    }
  }
`

const GetCommentPost = gql`
query MyQuery($ID_POST: Int!) {
    comments(where: {ID_POST: {_eq: $ID_POST}}) {
      ID_POST
      ID_COMMENT
      ID_USER
      Comment_post
    }
  }
`

const GetUserComment = gql`
query MyQuery($ID_USER: Int!) {
    user(where: {ID_USER: {_eq: $ID_USER}}) {
      ID_USER
      name
      username
    }
  }
`

const GetAllUser = gql`
query MyQuery {
    user {
      ID_USER
      name
      username
      pass
    }
  }  
`

export { GetDonatePost, GetDonatePostById, GetCommentPost, GetUserComment, GetAllUser }