const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require("cors");

const app = express()

app.use(express.json({extended:true}))
app.use(cors())

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/user', require('./routes/user.routes'))
const PORT = config.get('port') || 5000
app.use('/uploads',express.static('uploads'))
async function start() {
    try{
        await mongoose.connect(config.get('mongoUri'),{
            // userNewPerlParser : true,
            useUnifiedTopology: true,
            // userCreateIndex : true
        })
        app.listen(PORT,()=> console.log(`App has been started ${PORT}...`))
    }catch(e){
        console.log('Server Error', e.message)
        process.exit()
    }
}
start()