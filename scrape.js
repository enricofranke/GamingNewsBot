const cherio = require('cheerio')
const discord = require('discord.js')
const rp = require('request-promise')
const bot = new discord.Client() 

const optionsEpicGames = {
    url: `https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions?locale=de&country=DE&allowCountries=DE`,
    json: true
}

const getGamesOnCron = function(){
    let gameNames =  []
    let gamePrices = []
    const channelMain = bot.channels.cache.find(channel => channel.id === "794675752565080115")
    rp(optionsEpicGames)
    .then((data) =>{
        console.log(data)
        for(let game in data.data.Catalog.searchStore.elements){
            gameNames.push(name = data.data.Catalog.searchStore.elements[game].title)
            gamePrices.push(data.data.Catalog.searchStore.elements[game].price.totalPrice.fmtPrice.originalPrice)
        } 
        
        let send = []
        
        send.push("Epic GAMES")
        send.push("---------------------------")
        send.push("SOON: " + gameNames[0] + "     |      Original Price = " + gamePrices[0]);
        send.push("NOW : " + gameNames[1]+ "      |      Original Price = " +  gamePrices[1]);
        send.push("---------------------------")

        message.channel.send(send)
    }).catch((err)=>{
        console.log(err);
    })

}

 const getGamesOnCommand = function(message) {
    let gameNames =  []
    let gamePrices = []
    rp(optionsEpicGames)
    .then((data) =>{
        console.log(data)
        for(let game in data.data.Catalog.searchStore.elements){
            gameNames.push(name = data.data.Catalog.searchStore.elements[game].title)
            gamePrices.push(data.data.Catalog.searchStore.elements[game].price.totalPrice.fmtPrice.originalPrice)
            
            
        } 
        
        let send = []
        
        send.push("Epic GAMES")
        send.push("---------------------------")
        send.push("SOON: " + gameNames[0] + "     |      Original Price = " + gamePrices[0]);
        send.push("NOW : " + gameNames[1]+ "      |      Original Price = " +  gamePrices[1]);
        send.push("---------------------------")

        message.channel.send(send)
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports ={
    getGamesOnCommand,
    getGamesOnCron
}