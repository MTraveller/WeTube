import React, { useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { navigate, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import SearchBar from "./searchBar"

const HeaderStyles = styled.header`
  .burger-menu {
    cursor: pointer;
  }

  .logo {
    line-height: 1;
  }

  .user-settings {
    cursor: pointer;
  }
`

const Header = ({ siteTitle, data }) => {
  let [searchQuery, setSearchQuery] = useState("")
  let [videos, setVideos] = useState([])

  const handleSearch = query => {
    setSearchQuery((searchQuery = query))
  }

  const handleSubmit = e => {
    e.preventDefault()

    const querySubmit = e.target[0].value

    videos = data.videosData.nodes.filter(obj => {
      const videoName = obj.videoThumbnail
        .substring(0, obj.videoThumbnail.indexOf("."))
        .replaceAll("-", " ")

      return videoName.includes(querySubmit.toLowerCase())
    })

    setVideos(videos)
    return navigate("/results", { state: { videos: videos } })
  }

  return (
    <HeaderStyles className="flex flex-wrap items-center h-16 mt-4 mb-10 sm:mb-4">
      <div className="w-4 mr-5 burger-menu">
        <svg
          viewBox="0 0 100 70"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      </div>
      <Link className="logo w-16 mr-auto" to="/">
        <StaticImage
          src="../assets/logo.svg"
          loading="eager"
          width={64}
          height={16}
          formats={["auto", "svg"]}
          alt={`${siteTitle} logo`}
        />
      </Link>
      <div className="break w-auto sm:hidden"></div>
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-2/5 mx-auto order-last sm:order-none mt-4 sm:mt-0"
      >
        {/* Original input sourced from https://tailwind-elements.com/docs/standard/forms/search/ */}
        <div className="w-full justify-center">
          <div className="input-group relative flex items-stretch">
            <SearchBar value={searchQuery} onChange={handleSearch} />
            <button
              className="btn inline-block px-6 py-2.5 bg-gray-300 text-black font-medium text-xs leading-tight uppercase hover:bg-gray-400 hover:text-white focus:bg-gray-400 focus:outline-none focus:ring-0 active:bg-gray-400 active:shadow-lg transition duration-150 ease-in-out flex items-center"
              type="submit"
              id="search-button"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </form>
      <div className="btn w-3 ml-auto user-settings">
        <svg
          viewBox="0 0 29.96 122.88"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15,0A15,15,0,1,1,0,15,15,15,0,0,1,15,0Zm0,92.93a15,15,0,1,1-15,15,15,15,0,0,1,15-15Zm0-46.47a15,15,0,1,1-15,15,15,15,0,0,1,15-15Z" />
        </svg>
      </div>
      <div className="w-18 ml-5">
        <button id="signin" type="button" className="btn">
          <p>Sign in</p>
        </button>
      </div>
    </HeaderStyles>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
