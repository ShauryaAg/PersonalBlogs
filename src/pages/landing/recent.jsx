import React from 'react'
import { Container, Divider, Header } from 'semantic-ui-react'

import RecentList from './recentList'

function Recent() {
    return (
        <Container>
            <Divider horizontal>
                <Header as='h1'>
                    Recent
                </Header>
            </Divider>
            <Divider hidden />
            <RecentList />
        </Container>
    )
}

export default Recent