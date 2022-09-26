export default function Data(rawData) {
  let data = {}
  for (let k in rawData) {
    if (rawData[k].data.videosData) {
      data = { ...rawData[k].data }
    }
  }

  // Shuffle algorithm sourced from https://stackoverflow.com/a/3718452/19822058
  for (let i = 0; i < data?.videosData?.nodes.length - 1; i++) {
    let j = i + Math.floor(Math.random() * (data.videosData.nodes.length - i))

    let tempDataArray = data.videosData.nodes[j]
    data.videosData.nodes[j] = data.videosData?.nodes[i]
    data.videosData.nodes[i] = tempDataArray
  }

  return data
}
