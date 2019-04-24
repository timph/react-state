const express = require('express');
const router = require('./router');

const app = express();
app.set('port', process.env.PORT || 8080);

app.use(express.static('dist'));

router(app);

app.listen(app.get('port'), () => {
  console.log(`Server is listening at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
