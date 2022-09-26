export default function VideoObject(rawData, video) {
  let videoObject = []
  for (let k in rawData) {
    if (rawData[k].data.videosData) {
      const object = rawData[k].data.videosData.nodes.filter(obj => {
        return (
          // prettier-ignore
          obj.videoThumbnail
              .substring(0, obj.videoThumbnail
              .indexOf(".")) === video
        )
      })
      videoObject = object
    }
  }

  return videoObject
}
