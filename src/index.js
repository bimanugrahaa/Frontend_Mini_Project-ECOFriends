import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import './css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const httpLink = new HttpLink({
  uri: 'https://mini-project-frontend-ecofriends.hasura.app/v1/graphql',
    headers: {
      'x-hasura-admin-secret':'p7D7GcHdxpokU4E3lm7cfJUEzi4H2Bt8GAf2NotD95Sg5O7ApwXq66PcBTGuvFua'
  }
});

const wsLink = new WebSocketLink({
  uri: 'wss://mini-project-frontend-ecofriends.hasura.app/v1/graphql',
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        'x-hasura-admin-secret':'p7D7GcHdxpokU4E3lm7cfJUEzi4H2Bt8GAf2NotD95Sg5O7ApwXq66PcBTGuvFua'
    }
    }
  }
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
