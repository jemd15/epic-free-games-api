const axios = require('axios');

let gamesModel = {}

gamesModel.getFreeGames = () => {

  return axios.get('https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions', {
    responseType: 'json'
  })

}

module.exports = gamesModel;