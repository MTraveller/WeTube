import { getImage } from "gatsby-plugin-image"

export default function VideoImage(channelName, data) {
  const array = Object.values(data.videoImages.nodes)
  const name = channelName.substring(0, channelName.indexOf("."))

  let object = array.filter(obj => {
    const src = obj.childImageSharp.gatsbyImageData.images.fallback.src

    const lastSlash = src.lastIndexOf("/")
    const imageName = src.substring(lastSlash + 1, src.indexOf("."))

    if (imageName === name) return obj.childImageSharp

    return null
  })
  return getImage(object[0]?.childImageSharp)
}
