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
      Donates
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
      Donates
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
      email
    }
  }
`
// username => email

const GetAllUser = gql`
query MyQuery {
    user {
      ID_USER
      name
      email
    }
  }  
`
// username
// pass

const GetUserById = gql`
query MyQuery($ID_USER: Int!) {
  user(where: {ID_USER: {_eq: $ID_USER}}) {
    ID_USER
    name
    username
    pass
  }
}
`

const SearchDonatePost = gql`
query MyQuery($_iregex: String!) {
  donate_post(where: {Title: {_iregex: $_iregex}}) {
    ID_POST
    Title
    Subtitle
    Description
    Donation_Total
    Donation_Raised
    IMAGE_URL
    Donates
  }
}
`

const OrderDonatePostByComments = gql`
query MyQuery {
  donate_post_aggregate(limit: 10, order_by: {comments_aggregate: {count: desc_nulls_last}, Donates: desc}) {
    nodes {
      ID_POST
      Title
      Subtitle
      Donation_Total
      Donation_Raised
      IMAGE_URL
      Donates
      comments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
}
`

export { GetDonatePost, GetDonatePostById, GetCommentPost, GetUserComment, GetAllUser, GetUserById, SearchDonatePost, OrderDonatePostByComments }