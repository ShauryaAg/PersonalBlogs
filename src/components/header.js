import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import { Image } from "semantic-ui-react"

import Logo from '../images/logo.svg'

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `linear-gradient(227.87deg, #BD00FF 5.01%, rgba(0, 255, 255, 0.51) 98.22%)`,
      marginBottom: `0rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <span>
            <Image size='medium' src={Logo} style={{
              marginBottom: `0`,
              width: `unset`,
              height: '5em',
              display: `inline-block`,
            }} />
            <p style={{
              display: `inline`,
              marginLeft: `1rem`,
            }}>ShauryaAg</p>
          </span>
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
