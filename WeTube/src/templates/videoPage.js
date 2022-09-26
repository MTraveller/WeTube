// Getting

import * as React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Data from "../components/Data"
import VideoObject from "../components/VideoObject"
import videoImg from "../components/VideoImage"
import VideoChannelImage from "../components/VideoChannelImage"
import VideoPageURL from "../components/VideoPageURL"
import Layout from "../components/layout"
import Seo from "../components/seo"

const SectionStyles = styled.section`
  max-width: 900px;
  margin: 0 auto;
  h1 {
    text-transform: capitalize;
  }
  .video-details {
    max-width: 100%;
  }
  p {
    display: inline-block;
  }
  div span {
    float: right;
  }
`

const PageGridStyles = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;

  iframe {
    margin-bottom: 1rem;
  }

  .aside-div h2 {
    font-size: 20px;
  }

  aside {
    width: 100%;
    max-height: 360px;
    overflow: scroll;
    justify-self: end;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    article {
      width: 100%;
    }
    .aside-div {
      max-width: 360px;
      justify-self: center;
    }
  }
`

const RelatedVideosStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  margin-bottom: 1rem;
  h3 {
    font-weight: 600;
    font-size: 14px;
  }
`

const VideoPage = ({ pageResources, location }) => {
  const rawData = pageResources?.staticQueryResults
  const video = location.pathname.replace("/video/", "")

  const data = Data(rawData)
  console.log(data)

  let videoObject = VideoObject(rawData, video)
  console.log(videoObject)

  const videoName = videoObject[0]?.videoThumbnail
    .substring(0, videoObject[0]?.videoThumbnail.indexOf("."))
    .replaceAll("-", " ")

  const videoURL = videoObject[0]?.videoId.replace("watch?v=", "embed/").trim()

  function doExclude(videoThumbnail) {
    const currentVideoPage = videoName?.replaceAll(" ", "-")
    const videoURL = videoThumbnail?.substring(0, videoThumbnail?.indexOf("."))

    return videoURL === currentVideoPage
  }

  return (
    <>
      <Seo title={videoName} />
      <Layout>
        <SectionStyles>
          <h1 className="text-3xl mb-6">{videoName}</h1>
          <PageGridStyles>
            <article className="video-details">
              <iframe
                width="100%"
                height="315"
                src={videoURL}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <p>
                <em>Comments closed by Author</em>
              </p>
              <span>
                <em>{videoObject[0]?.views} Views</em>
              </span>
            </article>
            <div className="aside-div">
              <h2>
                <strong>Related Videos</strong>
              </h2>
              <aside>
                <>
                  {data?.videosData?.nodes.map(obj => (
                    <div key={`${obj?.id}`}>
                      {!doExclude(obj?.videoThumbnail) ? (
                        <RelatedVideosStyles>
                          <h3>{obj?.channelName}</h3>
                          <GatsbyImage
                            style={{
                              maxWidth: "40px",
                              maxHeight: "40px",
                              borderRadius: "50%",
                            }}
                            image={VideoChannelImage(
                              data,
                              obj?.channelThumbnail
                            )}
                            alt={`${obj?.channelName} channel image`}
                          />
                        </RelatedVideosStyles>
                      ) : (
                        ""
                      )}
                      {!doExclude(obj?.videoThumbnail) ? (
                        <Link
                          to={`/video/${VideoPageURL(obj?.videoThumbnail)}`}
                        >
                          <GatsbyImage
                            style={{
                              marginBottom: "2rem",
                            }}
                            image={videoImg(obj?.videoThumbnail, data)}
                            alt={`${obj?.channelName} video image`}
                          />
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </>
              </aside>
            </div>
          </PageGridStyles>
        </SectionStyles>
      </Layout>
    </>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */

// Had to move Head to return inside VideoPage function for dynamic title

export default VideoPage
