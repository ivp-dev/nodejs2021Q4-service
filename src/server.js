const { PORT } = require('./common/config');
const app = require('./app');

app.listen(PORT, err => {
    if (err) throw err
    console.log('Server listening on port: ' + PORT)
})
