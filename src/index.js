const app = require('./app')
//Using config
const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is up on port.' + port)
}) // dvlp 