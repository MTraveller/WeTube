import { getImage } from "gatsby-plugin-image"

export default function VideoChannelImage(data, channelName) {
  const array = Object.values(data.channelImages.nodes)

  const name = channelName.substring(0, channelName.indexOf("."))

  let object = array.filter(obj => {
    if (obj.name === name) return obj.childImageSharp
    return null
  })
  return getImage(object[0]?.childImageSharp)
}
