import React from 'react'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { List, Image, Header } from 'semantic-ui-react'

function RecentList() {
    const data = useStaticQuery(graphql`
        query All {
            allMarkdownRemark(
                sort: {fields: frontmatter___date, order: DESC}
            ) {
                edges {
                    node {
                        frontmatter {
                            title
                            path
                            featuredImage {
                                base
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
        <List divided relaxed size='small'>
            {
                edges.map(({ node }, key) => {
                    console.log(node)
                    return (
                        <List.Item key={key} as={Link} to={node.frontmatter.path}>
                            {
                                node.frontmatter.featuredImage ?
                                    <Image
                                        size='tiny'
                                        src={node.frontmatter.featuredImage.childImageSharp.fluid.src}
                                        rounded
                                    />
                                    :
                                    <Image
                                        size='tiny'
                                        src='https://react.semantic-ui.com/images/wireframe/paragraph.png'
                                    />
                            }
                            <List.Content verticalAlign='bottom'>
                                <Header size='small'>
                                    {node.frontmatter.title}
                                </Header>
                            </List.Content>
                        </List.Item >
                    )
                })
            }
        </List >
    )
}

// export const query = graphql`
// query All {
//         allMarkdownRemark(
//             sort: { fields: frontmatter___date, order: DESC }
//         ) {
//             edges {
//                 node {
//                     frontmatter {
//                         title
//                         path
//                         featuredImage {
//                             childImageSharp {
//                                 fluid(maxWidth: 300) {
//                                      ...GatsbyImageSharpFluid
//                                 }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }
// `

export default RecentList