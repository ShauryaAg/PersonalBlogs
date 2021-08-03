import React from "react"
import { Segment } from "semantic-ui-react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Featured from "./landing/featured"
import Blogs from "./landing/blogs"
import Title from "../components/title"

const IndexPage = () => (
	<Layout>
		<SEO title="Home" />
		<Title title="Featured" />
		<Segment>
			<Featured />
		</Segment>
		<Title title="Blogs" />
		<Blogs />
	</Layout>
)

export default IndexPage
