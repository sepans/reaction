import React, { Component } from "react"
import PropTypes from "prop-types"
import { QueryRenderer, graphql } from "react-relay"
import { ArticleData } from "../Typings"
import { getArtsySlugsFromArticle } from "../Constants"
import { keyBy } from "lodash"
import { TooltipsDataLoaderQueryResponse } from "../../../__generated__/TooltipsDataLoaderQuery.graphql"
import * as Artsy from "../../Artsy"

interface Props extends Artsy.ContextProps {
  article: ArticleData
  shouldFetchData?: boolean
}

export class TooltipsDataLoader extends Component<Props> {
  static defaultProps = {
    shouldFetchData: true,
  }

  render() {
    const {
      article,
      children,
      currentUser,
      relayEnvironment,
      shouldFetchData,
    } = this.props

    const { artists: artistSlugs, genes: geneSlugs } = getArtsySlugsFromArticle(
      article
    )

    if (!shouldFetchData) {
      return children
    }

    return (
      <QueryRenderer
        environment={relayEnvironment}
        query={graphql`
          query TooltipsDataLoaderQuery(
            $artistSlugs: [String!]
            $geneSlugs: [String!]
          ) {
            artists(slugs: $artistSlugs) {
              id
              is_followed
              ...ArtistToolTip_artist
              ...FollowArtistButton_artist
            }
            genes(slugs: $geneSlugs) {
              id
              ...GeneToolTip_gene
            }
          }
        `}
        variables={{
          artistSlugs,
          geneSlugs,
        }}
        render={readyState => {
          const data: TooltipsDataLoaderQueryResponse = {
            artists: [],
            genes: [],
          }
          Object.keys(readyState.props || {}).forEach(key => {
            const col = readyState.props[key]
            data[key] = keyBy(col, "id")
          })
          return (
            <TooltipsContextProvider {...data} currentUser={currentUser}>
              {children}
            </TooltipsContextProvider>
          )
        }}
      />
    )
  }
}

class TooltipsContextProvider extends Component<any> {
  static childContextTypes = {
    tooltipsData: PropTypes.object,
    currentUser: PropTypes.object,
  }

  getChildContext() {
    const { artists, currentUser, genes } = this.props
    return {
      tooltipsData: {
        artists,
        genes,
      },
      currentUser,
    }
  }

  render() {
    return this.props.children
  }
}

export const TooltipsData = Artsy.ContextConsumer(TooltipsDataLoader)
