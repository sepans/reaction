import { Box, Serif, Theme } from "@artsy/palette"
import { UserSettingsPayments_me } from "__generated__/UserSettingsPayments_me.graphql"
import { UserSettingsPaymentsQuery } from "__generated__/UserSettingsPaymentsQuery.graphql"
import { ContextConsumer, ContextProps } from "Artsy"
import { get } from "Utils/get"

import React from "react"
import {
  createFragmentContainer,
  graphql,
  QueryRenderer,
  RelayProp,
} from "react-relay"
import { PaymentFormWrapper } from "./PaymentFormWrapper"
import { SavedCreditCards } from "./SavedCreditCards"

interface UserSettingsPaymentsProps extends ContextProps {
  relay?: RelayProp
  me: UserSettingsPayments_me
}

export class UserSettingsPayments extends React.Component<
  UserSettingsPaymentsProps
> {
  constructor(props) {
    super(props)
  }

  render() {
    const creditCardEdges = get(this.props, props => props.me.creditCards.edges)
    const creditCards = creditCardEdges.map(({ node: creditCard }) => {
      return creditCard
    })

    return (
      <>
        <Theme>
          <>
            {creditCards && creditCards.length ? (
              <Box maxWidth={542}>
                <SavedCreditCards
                  creditCards={creditCards}
                  relay={this.props.relay}
                  me={this.props.me}
                />
                <Serif size="6" pb={3} pt={2}>
                  Add new card
                </Serif>
              </Box>
            ) : null}
            <PaymentFormWrapper relay={this.props.relay} me={this.props.me} />
          </>
        </Theme>
      </>
    )
  }
}

export const UserSettingsPaymentsFragmentContainer = createFragmentContainer(
  UserSettingsPayments,
  graphql`
    fragment UserSettingsPayments_me on Me {
      __id
      id
      creditCards(first: 100, limit: 100)
        @connection(key: "UserSettingsPayments_creditCards", filters: []) {
        edges {
          node {
            __id
            id
            brand
            last_digits
            expiration_year
            expiration_month
            __typename
          }
        }
      }
    }
  `
)

export const UserSettingsPaymentsQueryRenderer = () => {
  return (
    <ContextConsumer>
      {({ user, relayEnvironment }) => {
        if (!user) {
          return null
        }
        return (
          <QueryRenderer<UserSettingsPaymentsQuery>
            environment={relayEnvironment}
            variables={{}}
            query={graphql`
              query UserSettingsPaymentsQuery {
                me {
                  ...UserSettingsPayments_me
                }
              }
            `}
            render={({ props }) => {
              if (props) {
                return <UserSettingsPaymentsFragmentContainer me={props.me} />
              } else {
                return null
              }
            }}
          />
        )
      }}
    </ContextConsumer>
  )
}
