import React from 'react'
import { Container, Image, Header } from 'semantic-ui-react'

function GridRow(props) {
    return (
        <Container>
            {
                props.node.node.frontmatter.featuredImage ?
                    <Image
                        size='medium'
                        src={props.node.node.frontmatter.featuredImage.childImageSharp.fluid.src}
                    />
                    :
                    <Image
                        size='medium'
                        src='https://react.semantic-ui.com/images/wireframe/paragraph.png'
                    />

            }
            <Container>
                <Header>
                    {props.node.node.frontmatter.title}
                    <Header.Subheader>
                        <b>{props.node.node.frontmatter.author}</b> on <b>{props.node.node.frontmatter.date}</b>
                    </Header.Subheader>
                </Header>
            </Container>
        </Container>
    )
}

export default GridRow