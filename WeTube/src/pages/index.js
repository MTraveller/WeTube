import * as React from "react"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

import Data from "../components/Data"
import Layout from "../components/layout"
import Seo from "../components/seo"

const SectionStyles = styled.section`
  max-width: 900px;
  margin: 0 auto;
`

const VideosGridStyles = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(227px, 1fr));
  gap: 1.4rem;
  justify-items: center;
`

const IndexPage = ({ pageResources }) => {
  const rawData = pageResources?.staticQueryResults

  let data = Data(rawData)

  return (
    <Layout>
      <SectionStyles>
        <h1 className="text-3xl mb-6">Popular Videos</h1>
        <VideosGridStyles>
          {data.videoImages?.nodes.map(image => (
            <div key={image.id}>
              <h2>{image.name}</h2>
              <Link to={`/video/${image.name}`}>
                <li>
                  <GatsbyImage image={getImage(image)} alt={image.name} />
                </li>
              </Link>
            </div>
          ))}
        </VideosGridStyles>
      </SectionStyles>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
