import React from "react"

import styles from '../static/styles/styles.module.css'

const Title = ({ title }) => (
    <div className={`${styles.titleHeader} my-4`}>
        <span>{title}</span><span style={{ color: "#FD005D" }}>.</span>
    </div>
)

export default Title
