const express = require(`express`)
const app = express()
const mongoose = require(`mongoose`)
const port = 4000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const userRoute = require(`./routes/userRoute`)
app.use(`/users`, userRoute)
const productRoute = require(`./routes/productRoute`)
app.use(`/products`, productRoute)
const orderRoute = require(`./routes/orderRoute`)
app.use(`/orders`, orderRoute)

mongoose.connect(`mongodb+srv://admin:admin@wdc028-course-booking.mgfy3.mongodb.net/csp2-ecommerce?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log(`Connected to MongoDB`))

app.listen(port, () => console.log(`Now running localhost: ${port}`))