const express = require('express')
const path = require('path')

const app = express()

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
module.exports = (storage) => {
  app.get('/recent', (req, res) => {
    let recentKeys = Array.from(storage.messages.keys())
    recentKeys = recentKeys.slice(recentKeys.length - 100)
    const messages = recentKeys.map((key) => storage.messages.get(key))
    res.render('recent', {
      title: 'Recent replied messages',
      messages
    })
  })
  app.get('/stat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/usage.html'))
  })
  app.get('/stat/json', async (req, res) => {
    // res.render('index', { name: 'John' })
    res.json(await require('./function/usage')(storage))
  })
  // app.use('/example', require('./example'))

  return app
}
