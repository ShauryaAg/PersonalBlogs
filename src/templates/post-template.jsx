import React from 'react'
import { graphql } from 'gatsby'
import { Container, Header } from 'semantic-ui-react'

import Layout from '../components/layout'

function Template({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <Container text>
        <Header size='large' dividing>
          {post.frontmatter.title}
          <Header.Subheader>
            Posted by <b>{post.frontmatter.author}</b> on <b>{post.frontmatter.date}</b>
          </Header.Subheader>
        </Header>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Container>
    </Layout >
  )
}

export const postQuery = graphql`
query PostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        author
        date(formatString: "MMMM DD, YYYY")
        featuredImage {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default Template