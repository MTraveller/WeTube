/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "../styles/global.css"

const GridStyles = styled.div`
  min-height: 960px;
  display: grid;
  grid-template-rows: 80px 1fr 40px;
  gap: 4rem;

  footer {
    align-items: end;
  }
`

const Layout = ({ children }) => {
  const videosData = useStaticQuery(graphql`
    query VideosDataQuery {
      videosData: allDataJson {
        nodes {
          id
          channelName
          videoId
          views
          channelThumbnail
          videoThumbnail
        }
      }
      videoImages: allFile(filter: { sourceInstanceName: { eq: "videos" } }) {
        nodes {
          id
          name
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
      channelImages: allFile(
        filter: { sourceInstanceName: { eq: "channels" } }
      ) {
        nodes {
          id
          name
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  `)

  return (
    <GridStyles className="container max-w-5xl mx-auto px-5">
      <Header data={videosData} />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()} &middot; WeTube a simple Novare assessment
        site built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </GridStyles>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
