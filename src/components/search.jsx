import { graphql } from 'gatsby'
import React from 'react'

function Search({ data }) {
    return (
        <div>

        </div>
    )
}


export const query = graphql`
query Search($reg: String!) {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {title: {regex: $reg}}}) {
      edges {
        node {
          frontmatter {
            title
            author
            date(formatString: "MMM DD, YYYY")
            path
            featuredImage {
              base
              absolutePath
            }
          }
        }
      }
    }
  }
`


export default Search