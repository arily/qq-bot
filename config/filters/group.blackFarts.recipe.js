const filters = require('sb-qq-bot-framework/lib/filters')
module.exports = (...groups) => meta => filters.blockGroup(...groups)(meta).then(result => {
  if (result) return true
  if (!result) return !(['吃啥', '吃什么', '吃什麼'].some(cmd => meta.$parsed.message.includes(cmd)) && meta.$parsed.prefix !== null)
})
