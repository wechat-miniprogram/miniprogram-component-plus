// @ts-ignore
import emotionData from './emoji_data'

const emotionMap = {}
emotionData.forEach((item, index) => {
  if (item.cn) {
    emotionMap[item.cn] = item
  }
  if (item.code) emotionMap[item.code] = item
  if (item.us) emotionMap[item.us] = item
})

const parseEmoji = (content) => {
  let emojiIndexList = []
  for (const k in emotionMap) {
    let idx = content.indexOf(k)
    while (idx >= 0) {
      emojiIndexList.push({ idx, code: k, type: 2 })
      idx = content.indexOf(k, idx + k.length)
    }
  }

  emojiIndexList = emojiIndexList.sort((a, b) => {
    return a.idx - b.idx
  })
  const newContentList = []
  let lastTextIndex = 0
  emojiIndexList.forEach(item => {
    if (lastTextIndex !== item.idx) {
      newContentList.push({
        type: 1,
        content: content.substring(lastTextIndex, item.idx)
      })
    }
    if (item.type === 2) {
      newContentList.push({
        type: item.type,
        content: content.substr(item.idx, item.code.length),
        imageClass: emotionMap[item.code].style
      })
    } else {
      newContentList.push({
        type: item.type,
        content: item.code,
        imageClass: item.value
      })
    }
    lastTextIndex = item.idx + item.code.length
  })
  const lastText = content.substring(lastTextIndex)
  if (lastText) {
    newContentList.push({
      type: 1,
      content: lastText
    })
  }
  return newContentList
}
// console.log('test parse emoji', parseEmoji('/::-|/:8-)/::@/::-|/::P/::P/::@/::-|/::|/::@/::@/::P/::P/:,@P/:,@P/::P/::P/::P/::D'))

export {
  parseEmoji
}