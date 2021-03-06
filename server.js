const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// This is how to define a middleware for ALL HTTP REQUEST
// To confine to specific route handlers, pass the middleware as parameters
app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url} `;

  console.log(log);
  fs.appendFileSync('server.log', log + '\n');
  next(); // Without this, app does not move on
});

// app.use((req, res, next) => {
//   res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + '/public')); // Set static files root

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('capitalize', string => string.toUpperCase());

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage:
      'Hello you are in the home page rendered thru hbs template engine'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
