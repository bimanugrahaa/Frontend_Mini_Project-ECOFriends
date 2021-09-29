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

const SubscriptionComments = gql`
subscription MySubscription($ID_POST: Int!) {
  donate_post(where: {ID_POST: {_eq: $ID_POST}}) {
    ID_POST
    Donation_Raised
    Donation_Total
    comments(where: {ID_POST: {_eq: $ID_POST}}) {
      ID_COMMENT
      ID_USER
      Comment_post
    }
  }
}
`

export { SubscriptionDonatePost, SubscriptionComments }