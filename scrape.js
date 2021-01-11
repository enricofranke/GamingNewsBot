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
    let startDate = []
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
        send.push("SOON: " + gameNames[0] + "     |      Original Price = " + gamePrices[0] + "     Start Date =" + startDate[0]);
        send.push("NOW : " + gameNames[1]+ "      |      Original Price = " +  gamePrices[1]);
        send.push("---------------------------")

        message.channel.send(send)
    }).catch((err)=>{
        console.log(err);
    })

}

 const  getGamesOnCommand = async function(message) {
    let games =  []
    rp(optionsEpicGames)
    .then((data) =>{
        for(let game in data.data.Catalog.searchStore.elements){
            games.push({name: data.data.Catalog.searchStore.elements[game].title, price: data.data.Catalog.searchStore.elements[game].price.totalPrice.fmtPrice.originalPrice} )
            if(data.data.Catalog.searchStore.elements[game].promotions.promotionalOffers[0].promotionalOffers[0].startDate === 'undefined'){
                console.log('test')
            }
            else(
                console.log(data.data.Catalog.searchStore.elements[game].promotions.promotionalOffers[0].promotionalOffers[0].startDate)            
            )
        } 
        
        let send = []
        
        send.push("Epic GAMES")
        send.push("---------------------------")
        send.push("SOON: " + games[0].name + "     |      Original Price = " + games[0].price + "     Start Date =");
        send.push("NOW : " + games[1].name+ "      |      Original Price = " +  games[1].price);
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