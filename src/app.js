const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const app = express()
const port = 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


const newsAPI = 'http://newsapi.org/v2/top-headlines?country=eg&apiKey=3bd4753c68144c04b3eb73e44b7da657'

request({ url: newsAPI, json: true }, (error, response) => {
    const data = response.body.articles
    const urlToImage = response.body.articles[0].urlToImage
    const title = response.body.articles[0].title
    const description = response.body.articles[0].description
    const articleUrl = response.body.articles[0].url
    const publishedAt = response.body.articles[0].publishedAt
    app.get('', (req, res) => (
        res.render('index', {
            data: data,
            urlToImage: urlToImage,
            title: title,
            description: description,
            articleUrl: articleUrl,
            publishedAt : publishedAt
        })))
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
