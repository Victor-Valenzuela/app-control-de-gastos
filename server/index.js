const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 4000;
const routers = require('./routes/routes');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(routers);
app.use(express.static(path.join(__dirname, '../client/build')));

app.use((err, _req, res, next) => {
    console.log(err.message);
    res.status(500).send(`Algo ha salido mal porque ${err.message}`);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
