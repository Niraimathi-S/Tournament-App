require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./src/routes/users.route');
const teamsRouter = require('./src/routes/teams.route');
const tournamentRouter = require('./src/routes/tournaments.route');
const { verifyToken } = require('./src/middleware/authentication.js');
const playersRouter = require('./src/routes/player.route');
const matchRouter = require('./src/routes/match.route');

const { errorHandler } = require("./src/middleware/errorHandler");

const PORT = 4000;
const app = express();

var options = {
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credential: true
  }

// app.options('*', cors());
app.use(cors(options))
app.use(express.json());
app.use(verifyToken);
app.get('/', (req, res) => res.send('Server is running'));
app.use('/user', usersRouter);
app.use('/team', teamsRouter);
app.use('/tournament', tournamentRouter);
app.use('/player', playersRouter);
app.use('/match', matchRouter);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('open', () => console.log('Connected sucessfully'))
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
