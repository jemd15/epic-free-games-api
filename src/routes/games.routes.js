const express = require('express');
const router = express.Router();
const gamesModel = require('../models/games.models');
const moment = require('moment');

// get all free games
router.get('/', (req, res) => {
  gamesModel.getFreeGames()
    .then(data => {
      let games = data.data.data.Catalog.searchStore.elements;
      games = games.map(el => {
        return {
          title: el.title,
          description: el.description,
          date: (moment().diff(moment(el.effectiveDate)) > 0) ? 'free now': 'free next ' + moment(el.effectiveDate).format('dddd [at] HH:mm a')
        }
      })
      
      res.status(200).json({
        success: true,
        message: 'Games free from Epic Games Store',
        // games: data.games,
        // dateOfChange: data.date
        games 
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: 'Error on get free games from Epic Games Store',
        error: err.message
      });
    });
});

module.exports = router;