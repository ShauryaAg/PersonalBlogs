import React from 'react'

import { List, Grid, Header, Segment, Container, Divider } from 'semantic-ui-react'

function Footer() {
    return (
        <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em', background: "linear-gradient(90.01deg, rgba(14, 94, 230, 0.7) -3.99%, rgba(235, 0, 255, 0.693) 107.07%)" }}>
            <Container textAlign='center'>
                <Grid divided inverted stackable centered>
                    <Grid.Column width={6} style={{ textAlign: 'center' }}>
                        <Header inverted as='h4' content='Contact' style={{ textAlign: 'center' }} />
                        <List link inverted horizontal>
                            <List.Item as='a' href="mailto:shauryaag14@gmail.com"><strong>@</strong></List.Item>
                            <List.Item as='a' href="https://www.linkedin.com/in/shauryaag/"><i className="linkedin icon" /></List.Item>
                            <List.Item as='a' href="https://github.com/ShauryaAg"><i className="github icon" /></List.Item>
                            <List.Item as='a' href="https://medium.com/@ShauryaAg"><i className="medium icon" /></List.Item>
                            <List.Item as='a' href="https://twitter.com/ShauryaAg"><i className="twitter icon" /></List.Item>
                        </List>
                    </Grid.Column>
                </Grid>
                <Divider />
                <section>
                    <p><span style={{ fontSize: `2em` }}>©</span> Shaurya Agarwal <b>{new Date().getFullYear()}</b></p>
                </section>
            </Container>
        </Segment>
    )
}

export default Footer