import { Box, Spacer } from "@artsy/palette"
import { SearchResultsArtworkGrid_filtered_artworks } from "__generated__/SearchResultsArtworkGrid_filtered_artworks.graphql"
import { FilterState } from "Apps/Search/FilterState"
import { ContextConsumer } from "Artsy"
import ArtworkGrid from "Components/ArtworkGrid"
import { PaginationFragmentContainer as Pagination } from "Components/v2/Pagination"
import React, { Component } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { Subscribe } from "unstated"

import { ZeroState } from "Apps/Search/Components/ZeroState"
import { LoadingArea, LoadingAreaState } from "Components/v2/LoadingArea"

interface Props {
  columnCount: number | number[]
  filters?: any
  filtered_artworks: SearchResultsArtworkGrid_filtered_artworks
  isLoading?: boolean
  relay: RelayRefetchProp
  term: string
}

const PAGE_SIZE = 30

class SearchResultsArtworkGrid extends Component<Props, LoadingAreaState> {
  state = {
    isLoading: false,
  }

  loadNext = (filters, mediator) => {
    const {
      filtered_artworks: {
        artworks: {
          pageInfo: { hasNextPage, endCursor },
        },
      },
    } = this.props

    if (hasNextPage) {
      this.loadAfter(endCursor, filters.state.page + 1, filters, mediator)
    }
  }

  loadAfter = (cursor, page, filters, mediator) => {
    this.toggleLoading(true)

    this.props.relay.refetch(
      {
        first: PAGE_SIZE,
        after: cursor,
        filteredArtworksNodeID: this.props.filtered_artworks.__id,
      },
      null,
      error => {
        this.toggleLoading(false)
        filters.setPage(page, mediator)
        if (error) {
          console.error(error)
        }
      }
    )
  }

  toggleLoading = isLoading => {
    this.setState({
      isLoading,
    })
  }

  render() {
    const {
      columnCount,
      filtered_artworks: { artworks },
      term,
    } = this.props
    const isLoading = this.state.isLoading || this.props.isLoading

    const emptyStateComponent = <ZeroState entity="artworks" term={term} />

    return (
      <ContextConsumer>
        {({ user, mediator }) => {
          return (
            <Subscribe to={[FilterState]}>
              {(filters: FilterState) => {
                return (
                  <LoadingArea isLoading={isLoading}>
                    <ArtworkGrid
                      artworks={artworks as any}
                      columnCount={columnCount}
                      preloadImageCount={9}
                      itemMargin={40}
                      user={user}
                      mediator={mediator}
                      onClearFilters={filters.resetFilters}
                      emptyStateComponent={emptyStateComponent}
                    />

                    <Spacer mb={3} />

                    <Box>
                      <Pagination
                        hasNextPage={artworks.pageInfo.hasNextPage}
                        pageCursors={artworks.pageCursors as any}
                        onClick={(cursor, page) => {
                          this.loadAfter(cursor, page, filters, mediator)
                        }}
                        onNext={() => {
                          this.loadNext(filters, mediator)
                        }}
                        scrollTo="#jump--searchArtworkGrid"
                      />
                    </Box>
                  </LoadingArea>
                )
              }}
            </Subscribe>
          )
        }}
      </ContextConsumer>
    )
  }
}

export const SearchResultsArtworkGridRefreshContainer = createRefetchContainer(
  SearchResultsArtworkGrid,
  {
    filtered_artworks: graphql`
      fragment SearchResultsArtworkGrid_filtered_artworks on FilterArtworks
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 30 }
          after: { type: "String", defaultValue: "" }
        ) {
        __id
        artworks: artworks_connection(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          ...ArtworkGrid_artworks
          edges {
            node {
              __id
            }
          }
        }
      }
    `,
  },
  graphql`
    query SearchResultsArtworkGridQuery(
      $filteredArtworksNodeID: ID!
      $first: Int!
      $after: String
    ) {
      filtered_artworks: node(__id: $filteredArtworksNodeID) {
        ...SearchResultsArtworkGrid_filtered_artworks
          @arguments(first: $first, after: $after)
      }
    }
  `
)