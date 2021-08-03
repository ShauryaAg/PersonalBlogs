import React from 'react'
import { Container, Image, Header } from 'semantic-ui-react'

function GridRow({ node }) {
    return (
        <Container>
            {
                node?.node?.frontmatter?.featuredImage ?
                    <Image
                        size='medium'
                        src={node?.node?.frontmatter?.featuredImage.childImageSharp.fluid.src}
                    />
                    :
                    <Image
                        size='medium'
                        src='https://react.semantic-ui.com/images/wireframe/paragraph.png'
                    />

            }
            <Container>
                <Header>
                    {node?.node?.frontmatter?.title}
                    <Header.Subheader>
                        <b>{node?.node?.frontmatter?.author}</b> on <b>{node?.node?.frontmatter?.date}</b>
                    </Header.Subheader>
                </Header>
            </Container>
        </Container>
    )
}

export default GridRow