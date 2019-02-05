const express = require('express');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const hb = require('express-handlebars');
app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const routes = require('./controllers/burgers_controller');

app.use(routes);

app.listen(PORT, () => {
    console.log(`Listening on: http://localhost:${PORT}`);
});
