//app.js
const express = require('express');
const app = express();
const itemsRouters = require('./routes/itemsRoutes');

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({extended:true}));

app.use('/', itemsRouters);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: err.message || 'Something went wrong'})
})

app.use((req, res) => {
    res.status(404).json({error: 'Page not found'})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App listening at ${PORT}`))
