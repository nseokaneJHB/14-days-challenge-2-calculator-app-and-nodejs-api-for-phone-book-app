const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000;

// parse requests of content-type - application/json
app.use(bodyParser.json());

/* parse requests of content-type - application/x-www-form-urlencoded */
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./database/operations')

app.get('/contacts/', routes.getContacts)
app.get('/contacts/:id/', routes.getContactById)
app.post('/contacts/', routes.createContact)
app.put('/contacts/:id/', routes.updateContact)
app.delete('/contacts/:id/', routes.deleteContact)

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`)
})