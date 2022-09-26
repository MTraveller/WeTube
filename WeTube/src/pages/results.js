import * as React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Data from "../components/Data"
import videoImg from "../components/VideoImage"
import VideoChannelImage from "../components/VideoChannelImage"
import VideoPageURL from "../components/VideoPageURL"
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

const VideosHeaderStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  margin-bottom: 1rem;
  h3 {
    font-weight: 600;
    font-size: 14px;
  }
`

const SearchResultPage = ({ pageResources, location }) => {
  const rawData = pageResources?.staticQueryResults
  const state = location.state?.videos

  const data = Data(rawData)

  return (
    <Layout>
      <SectionStyles>
        <h1 className="text-3xl mb-6">Search Result:</h1>
        <VideosGridStyles>
          <>
            {state?.map(obj => (
              <div key={`${obj.id}`}>
                <VideosHeaderStyles>
                  <h3>{obj.channelName}</h3>
                  <GatsbyImage
                    style={{
                      maxWidth: "40px",
                      maxHeight: "40px",
                      borderRadius: "50%",
                    }}
                    image={VideoChannelImage(data, obj.channelThumbnail)}
                    alt={`${obj.channelName} channel image`}
                  />
                </VideosHeaderStyles>

                <Link to={`/video/${VideoPageURL(obj.videoThumbnail)}`}>
                  <GatsbyImage
                    style={{
                      marginBottom: "2rem",
                    }}
                    image={videoImg(obj.videoThumbnail, data)}
                    alt={`${obj.channelName} video image`}
                  />
                </Link>
              </div>
            ))}
          </>
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
export const Head = () => <Seo title="Search Result" />

export default SearchResultPage
