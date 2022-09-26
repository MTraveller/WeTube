const path = require("path")
const data = require("./src/assets/data/data.json")

exports.createPages = async function ({ actions, graphql }) {
  const videoTemplate = path.resolve("./src/templates/videoPage.js")
  const { createPage } = actions

  data.forEach(video => {
    console.log(video)
    createPage({
      path: `video/${video.videoThumbnail.substring(
        0,
        video.videoThumbnail.indexOf(".")
      )}`,
      component: videoTemplate,
      context: {
        slug: video.videoThumbnail.substring(
          0,
          video.videoThumbnail.indexOf(".")
        ),
      },
    })
  })
}
