import { gql } from '@apollo/client'

const SubscriptionDonatePost = gql`
subscription MySubscription {
    donate_post(order_by: {ID_POST: asc}) {
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

const SubscriptionInfo = gql`
subscription MySubscription($ID_POST: Int!) {
  donate_post(where: {ID_POST: {_eq: $ID_POST}}) {
    ID_POST
    Donation_Raised
    Donation_Total
  }
}
`

// const SubscriptionComments = gql`
// subscription MySubscription($ID_POST: Int!) {
//   comments(where: {ID_POST: {_eq: $ID_POST}}) {
//     ID_COMMENT
//     ID_USER
//     Comment_post
//     user {
//       ID_USER
//       name
//       username
//     }
//   }
// }
// `

const SubscriptionComments = gql`
subscription MySubscription($ID_POST: Int!, $ID_COMMENT: order_by = asc) {
  comments(where: {ID_POST: {_eq: $ID_POST}}, order_by: {ID_COMMENT: $ID_COMMENT}) {
    ID_COMMENT
    ID_USER
    Comment_post
    user {
      ID_USER
      name
      username
    }
  }
}
`

export { SubscriptionDonatePost, SubscriptionInfo, SubscriptionComments }