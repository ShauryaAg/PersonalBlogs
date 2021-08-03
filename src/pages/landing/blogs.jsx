import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'

import { Container } from 'semantic-ui-react'

import styles from '../../assets/styles/styles.module.css'

function Blogs() {
    const data = useStaticQuery(graphql`
    query allPosts {
        allMarkdownRemark(
          sort: {fields: frontmatter___date, order: DESC}, 
          ) {
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
        <Container>
            {
                edges.map(({ node }) => (
                    <Link to={node.frontmatter.path} className={styles.links}>
                        <div className={`${styles.card} mb-3`} >
                            <div className="row no-gutters" >
                                <div className="col-md-12" >
                                    <div className={styles.cardBody}>
                                        <h2 className={styles.cardTitle}>{node.frontmatter.title}</h2>
                                        <p className={styles.cardText}><small className={"text-muted"}>
                                            <b>{node.frontmatter.author}</b> on {node.frontmatter.date}
                                        </small>
                                        </p>
                                        <p className={`${styles.cardText} ${styles.cardContent}`} dangerouslySetInnerHTML={{ __html: node.html }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link >
                )
                )
            }
        </Container >
    )
}

export default Blogs