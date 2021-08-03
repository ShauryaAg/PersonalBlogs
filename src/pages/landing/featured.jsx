import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'

import { Divider, Grid } from 'semantic-ui-react'

import GridRow from './GridRow'

function Featured() {
  const data = useStaticQuery(graphql`
    query featuredPost {
        allMarkdownRemark(
          sort: {fields: frontmatter___date, order: DESC}, 
          filter: {frontmatter: {featured: {eq: true}}}, 
          limit: 3) {
          edges {
            node {
              html
              frontmatter {
                author
                date(formatString: "MMM DD, YYYY")
                path
                title
                featuredImage {
                  childImageSharp {
                    fluid(maxWidth: 300) {
                        ...GatsbyImageSharpFluid
                    }
                }
              }
            }
          }
        }
      }
    }
    `)
  const edges = data.allMarkdownRemark.edges

  return (
    <Grid divided='horizontally'>
      <Grid.Row columns={2}>
        <Grid.Column verticalAlign='bottom'>
          <Grid.Row as={Link} to={edges[0].node.frontmatter.path} stretched>
            <GridRow node={edges[0]} />
          </Grid.Row>
        </Grid.Column>
        <Grid.Column rows={2}>
          <Grid.Row as={Link} to={edges[1].node.frontmatter.path}>
            <GridRow node={edges[1]} />
          </Grid.Row>
          <Divider />
          <Grid.Row as={Link} to={edges[2].node.frontmatter.path}>
            <GridRow node={edges[2]} />
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default Featured