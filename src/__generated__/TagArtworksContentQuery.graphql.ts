/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { TagArtworksContent_filtered_artworks$ref } from "./TagArtworksContent_filtered_artworks.graphql";
export type TagArtworksContentQueryVariables = {
    readonly filteredArtworksNodeID: string;
    readonly count: number;
    readonly cursor?: string | null;
    readonly sort?: string | null;
};
export type TagArtworksContentQueryResponse = {
    readonly node: ({
        readonly " $fragmentRefs": TagArtworksContent_filtered_artworks$ref;
    }) | null;
};
export type TagArtworksContentQuery = {
    readonly response: TagArtworksContentQueryResponse;
    readonly variables: TagArtworksContentQueryVariables;
};



/*
query TagArtworksContentQuery(
  $filteredArtworksNodeID: ID!
  $count: Int!
  $cursor: String
  $sort: String
) {
  node(__id: $filteredArtworksNodeID) {
    __typename
    ...TagArtworksContent_filtered_artworks_1G22uz
    __id
  }
}

fragment TagArtworksContent_filtered_artworks_1G22uz on FilterArtworks {
  __id
  artworks: artworks_connection(first: $count, after: $cursor, sort: $sort) {
    pageInfo {
      hasNextPage
      endCursor
    }
    ...ArtworkGrid_artworks
    edges {
      node {
        __id
        __typename
      }
      cursor
    }
  }
}

fragment ArtworkGrid_artworks on ArtworkConnection {
  edges {
    node {
      __id
      image {
        aspect_ratio
      }
      ...GridItem_artwork
    }
  }
}

fragment GridItem_artwork on Artwork {
  image {
    placeholder
    url(version: "large")
    aspect_ratio
  }
  is_biddable
  sale {
    is_preview
    __id
  }
  is_acquireable
  href
  ...Metadata_artwork
  ...Save_artwork
  __id
}

fragment Metadata_artwork on Artwork {
  ...Details_artwork
  ...Contact_artwork
  href
  __id
}

fragment Save_artwork on Artwork {
  __id
  id
  is_saved
}

fragment Details_artwork on Artwork {
  href
  title
  date
  sale_message
  cultural_maker
  artists(shallow: true) {
    __id
    href
    name
  }
  collecting_institution
  partner(shallow: true) {
    name
    href
    __id
  }
  sale {
    is_auction
    is_live_open
    is_open
    is_closed
    display_timely_at
    __id
  }
  sale_artwork {
    highest_bid {
      display
      __id: id
    }
    opening_bid {
      display
    }
    __id
  }
  __id
}

fragment Contact_artwork on Artwork {
  _id
  href
  is_inquireable
  sale {
    is_auction
    is_live_open
    is_open
    is_closed
    __id
  }
  partner(shallow: true) {
    type
    __id
  }
  sale_artwork {
    highest_bid {
      display
      __id: id
    }
    opening_bid {
      display
    }
    counts {
      bidder_positions
    }
    __id
  }
  __id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "filteredArtworksNodeID",
    "type": "ID!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "count",
    "type": "Int!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "cursor",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "sort",
    "type": "String",
    "defaultValue": null
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "__id",
    "variableName": "filteredArtworksNodeID",
    "type": "ID!"
  }
],
v2 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__id",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true,
    "type": "Boolean"
  }
],
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "operationKind": "query",
  "name": "TagArtworksContentQuery",
  "id": null,
  "text": "query TagArtworksContentQuery(\n  $filteredArtworksNodeID: ID!\n  $count: Int!\n  $cursor: String\n  $sort: String\n) {\n  node(__id: $filteredArtworksNodeID) {\n    __typename\n    ...TagArtworksContent_filtered_artworks_1G22uz\n    __id\n  }\n}\n\nfragment TagArtworksContent_filtered_artworks_1G22uz on FilterArtworks {\n  __id\n  artworks: artworks_connection(first: $count, after: $cursor, sort: $sort) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    ...ArtworkGrid_artworks\n    edges {\n      node {\n        __id\n        __typename\n      }\n      cursor\n    }\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnection {\n  edges {\n    node {\n      __id\n      image {\n        aspect_ratio\n      }\n      ...GridItem_artwork\n    }\n  }\n}\n\nfragment GridItem_artwork on Artwork {\n  image {\n    placeholder\n    url(version: \"large\")\n    aspect_ratio\n  }\n  is_biddable\n  sale {\n    is_preview\n    __id\n  }\n  is_acquireable\n  href\n  ...Metadata_artwork\n  ...Save_artwork\n  __id\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  ...Contact_artwork\n  href\n  __id\n}\n\nfragment Save_artwork on Artwork {\n  __id\n  id\n  is_saved\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message\n  cultural_maker\n  artists(shallow: true) {\n    __id\n    href\n    name\n  }\n  collecting_institution\n  partner(shallow: true) {\n    name\n    href\n    __id\n  }\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    display_timely_at\n    __id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      __id: id\n    }\n    opening_bid {\n      display\n    }\n    __id\n  }\n  __id\n}\n\nfragment Contact_artwork on Artwork {\n  _id\n  href\n  is_inquireable\n  sale {\n    is_auction\n    is_live_open\n    is_open\n    is_closed\n    __id\n  }\n  partner(shallow: true) {\n    type\n    __id\n  }\n  sale_artwork {\n    highest_bid {\n      display\n      __id: id\n    }\n    opening_bid {\n      display\n    }\n    counts {\n      bidder_positions\n    }\n    __id\n  }\n  __id\n}\n",
  "metadata": {},
  "fragment": {
    "kind": "Fragment",
    "name": "TagArtworksContentQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": v1,
        "concreteType": null,
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "TagArtworksContent_filtered_artworks",
            "args": [
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count",
                "type": null
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor",
                "type": null
              }
            ]
          },
          v2
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "TagArtworksContentQuery",
    "argumentDefinitions": v0,
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "node",
        "storageKey": null,
        "args": v1,
        "concreteType": null,
        "plural": false,
        "selections": [
          v3,
          v2,
          {
            "kind": "InlineFragment",
            "type": "FilterArtworks",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": "artworks",
                "name": "artworks_connection",
                "storageKey": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "after",
                    "variableName": "cursor",
                    "type": "String"
                  },
                  {
                    "kind": "Variable",
                    "name": "first",
                    "variableName": "count",
                    "type": "Int"
                  },
                  {
                    "kind": "Variable",
                    "name": "sort",
                    "variableName": "sort",
                    "type": "String"
                  }
                ],
                "concreteType": "ArtworkConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "pageInfo",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "hasNextPage",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "endCursor",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "edges",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "ArtworkEdge",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "node",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "plural": false,
                        "selections": [
                          v2,
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "image",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Image",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "aspect_ratio",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "placeholder",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "url",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "version",
                                    "value": "large",
                                    "type": "[String]"
                                  }
                                ],
                                "storageKey": "url(version:\"large\")"
                              }
                            ]
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "is_biddable",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "sale",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Sale",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "is_preview",
                                "args": null,
                                "storageKey": null
                              },
                              v2,
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "is_auction",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "is_live_open",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "is_open",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "is_closed",
                                "args": null,
                                "storageKey": null
                              },
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "display_timely_at",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "is_acquireable",
                            "args": null,
                            "storageKey": null
                          },
                          v4,
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "title",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "date",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "sale_message",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "cultural_maker",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "artists",
                            "storageKey": "artists(shallow:true)",
                            "args": v5,
                            "concreteType": "Artist",
                            "plural": true,
                            "selections": [
                              v2,
                              v4,
                              v6
                            ]
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "collecting_institution",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "partner",
                            "storageKey": "partner(shallow:true)",
                            "args": v5,
                            "concreteType": "Partner",
                            "plural": false,
                            "selections": [
                              v6,
                              v4,
                              v2,
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "type",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "sale_artwork",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "SaleArtwork",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "highest_bid",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "SaleArtworkHighestBid",
                                "plural": false,
                                "selections": [
                                  v7,
                                  {
                                    "kind": "ScalarField",
                                    "alias": "__id",
                                    "name": "id",
                                    "args": null,
                                    "storageKey": null
                                  }
                                ]
                              },
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "opening_bid",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "SaleArtworkOpeningBid",
                                "plural": false,
                                "selections": [
                                  v7
                                ]
                              },
                              v2,
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "counts",
                                "storageKey": null,
                                "args": null,
                                "concreteType": "SaleArtworkCounts",
                                "plural": false,
                                "selections": [
                                  {
                                    "kind": "ScalarField",
                                    "alias": null,
                                    "name": "bidder_positions",
                                    "args": null,
                                    "storageKey": null
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "_id",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "is_inquireable",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "id",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "is_saved",
                            "args": null,
                            "storageKey": null
                          },
                          v3
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "cursor",
                        "args": null,
                        "storageKey": null
                      }
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedHandle",
                "alias": "artworks",
                "name": "artworks_connection",
                "args": [
                  {
                    "kind": "Variable",
                    "name": "after",
                    "variableName": "cursor",
                    "type": "String"
                  },
                  {
                    "kind": "Variable",
                    "name": "first",
                    "variableName": "count",
                    "type": "Int"
                  },
                  {
                    "kind": "Variable",
                    "name": "sort",
                    "variableName": "sort",
                    "type": "String"
                  }
                ],
                "handle": "connection",
                "key": "TagArtworksContent_filtered_artworks",
                "filters": [
                  "sort"
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
})();
(node as any).hash = '33f06979a056635012f1d3e4839b3761';
export default node;
