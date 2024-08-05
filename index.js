import express from 'express'
import path from 'path'
import { config } from 'dotenv'
config()
const app = express()
const port = +process.env.PORT || 4000
const productURL = 'http://localhost:3000/products'
app.use(express.static('./static'))

// Retrieve data
async function getData() {
    return await (await fetch(productURL)).json()
}
app.get('/', (req, res) => {
    res.status(200).sendFile(
        path.resolve('./static/index.html'))
})
app.get('/about', (req, res) => {
    res.status(200).sendFile(
        path.resolve('./static/about.html'))
})
app.get('/products', async (req, res) => {
    try {
        res.status(200).json(await getData())
    } catch (e) { 
        res.status(404).json({
            msg: 'Please try again later'
        })
    } 
})
app.get('/product/:id', async (req, res) => {  // /product -endpoint  /:id parameter
    try {
        let data = await getData()
        const id = +req.params.id    //params.id is a string therfore it needs to be converted to a number
        if (id <=  data.length) {
            res.status(200).json(data[id -1])
        } else {
            res.status(404).json({
                msg: 'Resource not found'
            })
        }
    } catch (e) { 
        res.status(404).json({
            msg: 'Please try again later'
        })
    }
})
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})







































































































