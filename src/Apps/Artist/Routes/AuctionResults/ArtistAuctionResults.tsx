import { Col, Row } from "@artsy/palette"
import { ArtistAuctionResults_artist } from "__generated__/ArtistAuctionResults_artist.graphql"
import { PaginationFragmentContainer as Pagination } from "Components/v2/Pagination"
import React, { useState } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import useDeepCompareEffect from "use-deep-compare-effect"
import { AuctionResultItemFragmentContainer as AuctionResultItem } from "./ArtistAuctionResultItem"
import { TableSidebar } from "./Components/TableSidebar"

import { Box, Spacer } from "@artsy/palette"

import { AnalyticsSchema } from "Artsy"
import { LoadingArea } from "Components/v2/LoadingArea"
import { isEqual } from "lodash"
import { useTracking } from "react-tracking"
import { usePrevious } from "Utils/Hooks/usePrevious"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import {
  AuctionResultsFilterContextProvider,
  useAuctionResultsFilterContext,
} from "./AuctionResultsFilterContext"
import { AuctionFilterMobileActionSheet } from "./Components/AuctionFilterMobileActionSheet"
import { AuctionFilters } from "./Components/AuctionFilters"
import { AuctionResultHeaderFragmentContainer as AuctionResultHeader } from "./Components/AuctionResultHeader"
import { AuctionResultsControls } from "./Components/AuctionResultsControls"

const logger = createLogger("ArtistAuctionResults.tsx")

const PAGE_SIZE = 10

interface AuctionResultsProps {
  relay: RelayRefetchProp
  artist: ArtistAuctionResults_artist
}

const AuctionResultsContainer: React.FC<AuctionResultsProps> = ({
  artist,
  relay,
}) => {
  const filterContext = useAuctionResultsFilterContext()

  const { sort, organizations, sizes } = filterContext.filters

  const loadNext = () => {
    const { hasNextPage, endCursor } = pageInfo

    if (hasNextPage) {
      loadAfter(endCursor)
    }
  }

  const loadAfter = cursor => {
    setIsLoading(true)

    relay.refetch(
      {
        first: PAGE_SIZE,
        after: cursor,
        artistID: artist.slug,
        before: null,
        last: null,
        organizations,
        sizes,
        sort,
      },
      null,
      error => {
        setIsLoading(false)

        if (error) {
          logger.error(error)
        }
      }
    )
  }

  const [isLoading, setIsLoading] = useState(false)
  const [showMobileActionSheet, toggleMobileActionSheet] = useState(false)
  const tracking = useTracking()

  const previousFilters = usePrevious(filterContext.filters)

  // TODO: move this and artwork copy to util?
  useDeepCompareEffect(() => {
    Object.entries(filterContext.filters).forEach(
      ([filterKey, currentFilter]) => {
        const previousFilter = previousFilters[filterKey]
        const filtersHaveUpdated = !isEqual(currentFilter, previousFilter)
        if (filtersHaveUpdated) {
          fetchResults()

          tracking.trackEvent({
            context_page: AnalyticsSchema.PageName.ArtistAuctionResults,
            action_type:
              AnalyticsSchema.ActionType.AuctionResultFilterParamChanged,
            current: filterContext.filters,
            changed: {
              [filterKey]: filterContext.filters[filterKey],
            },
          })
        }
      }
    )
  }, [filterContext.filters])

  // TODO: move this and artwork copy to util? (pass loading state setter)
  function fetchResults() {
    setIsLoading(true)

    const relayParams = {
      first: PAGE_SIZE,
      artistID: artist.slug,
      after: null,
      before: null,
      last: null,
    }

    const relayRefetchVariables = {
      ...relayParams,
      ...filterContext.filters,
    }

    relay.refetch(relayRefetchVariables, null, error => {
      if (error) {
        logger.error(error)
      }

      setIsLoading(false)
    })
  }

  const { pageInfo } = artist.auctionResultsConnection
  const auctionResultsLength = artist.auctionResultsConnection.edges.length

  const resultList = (
    <LoadingArea isLoading={isLoading}>
      {artist.auctionResultsConnection.edges.map(({ node }, index) => {
        return (
          <React.Fragment key={index}>
            <AuctionResultItem
              index={index}
              auctionResult={node}
              lastChild={index === auctionResultsLength - 1}
            />
          </React.Fragment>
        )
      })}
    </LoadingArea>
  )

  return (
    <>
      {showMobileActionSheet && (
        <AuctionFilterMobileActionSheet
          onClose={() => toggleMobileActionSheet(false)}
        >
          <AuctionFilters />
        </AuctionFilterMobileActionSheet>
      )}
      <Row>
        <AuctionResultHeader artist={artist} />
      </Row>
      <Row>
        <Col sm={3} pr={[0, 2]}>
          <Media greaterThan="xs">
            <TableSidebar />
          </Media>
        </Col>

        <Col sm={9}>
          <AuctionResultsControls
            artist={artist}
            toggleMobileActionSheet={toggleMobileActionSheet}
          />

          <Spacer mt={3} />

          {resultList}
        </Col>
      </Row>

      <Row>
        <Col>
          <Box>
            <Pagination
              hasNextPage={pageInfo.hasNextPage}
              pageCursors={artist.auctionResultsConnection.pageCursors}
              onClick={loadAfter}
              onNext={loadNext}
              scrollTo="#jumpto-ArtistHeader"
            />
          </Box>
        </Col>
      </Row>
    </>
  )
}

export const ArtistAuctionResultsRefetchContainer = createRefetchContainer(
  (props: AuctionResultsProps) => {
    return (
      <AuctionResultsFilterContextProvider>
        <AuctionResultsContainer {...props} />
      </AuctionResultsFilterContextProvider>
    )
  },
  {
    artist: graphql`
      fragment ArtistAuctionResults_artist on Artist
        @argumentDefinitions(
          sort: { type: "AuctionResultSorts", defaultValue: DATE_DESC }
          first: { type: "Int", defaultValue: 10 }
          last: { type: "Int" }
          after: { type: "String" }
          before: { type: "String" }
          organizations: { type: "[String]" }
          sizes: { type: "[ArtworkSizes]" }
        ) {
        slug
        ...AuctionResultHeader_artist
        auctionResultsConnection(
          first: $first
          after: $after
          before: $before
          last: $last
          sort: $sort
          organizations: $organizations
          sizes: $sizes
        ) {
          ...AuctionResultsCount_results
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          totalCount
          edges {
            node {
              title
              dimension_text: dimensionText
              images {
                thumbnail {
                  url
                }
              }
              description
              date_text: dateText
              ...ArtistAuctionResultItem_auctionResult
            }
          }
        }
      }
    `,
  },
  graphql`
    query ArtistAuctionResultsQuery(
      $first: Int
      $last: Int
      $after: String
      $before: String
      $sort: AuctionResultSorts
      $artistID: String!
      $organizations: [String]
      $sizes: [ArtworkSizes]
    ) {
      artist(id: $artistID) {
        ...ArtistAuctionResults_artist
          @arguments(
            first: $first
            last: $last
            after: $after
            before: $before
            sort: $sort
            organizations: $organizations
            sizes: $sizes
          )
      }
    }
  `
)
