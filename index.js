const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8081;
const BASE_API_URL = "/api/v1";
const API_DOC_TRADE = "https://documenter.getpostman.com/view/19585767/UVsTqhfQ";

app.use(bodyParser.json());


//##################### API marsaamar1 ####################//

var loadInitialDataTradeStats = [
    {		
        country : "España",
        year : 2018,
        export : 293458.8,
        import : 330635.8,
        balance : -37177.1
    },
    {		
        country : "Alemania",
        year : 2018,
        export : 1320732.4,
        import : 1087431.3,
        balance : 233301.1
    },
    {		
        country : "Reino Unido",
        year : 2018,
        export : 412055.5,
        import : 570546.8,
        balance : -158491.3
    },
    {		
        country : "Francia",
        year : 2018,
        export : 492964.1,
        import : 572576.0,
        balance : -79611.9
    },
    {		
        country : "Italia",
        year : 2018,
        export : 465325.4,
        import : 426045.7,
        balance : 39279.7
    }
    
];

var tradeStats = [
    {		
        country : "España",
        year : 2018,
        export : 293458.8,
        import : 330635.8,
        balance : -37177.1
    },
    {		
        country : "Alemania",
        year : 2018,
        export : 1320732.4,
        import : 1087431.3,
        balance : 233301.1
    },
    {		
        country : "Reino Unido",
        year : 2018,
        export : 412055.5,
        import : 570546.8,
        balance : -158491.3
    },
    {		
        country : "Francia",
        year : 2018,
        export : 492964.1,
        import : 572576.0,
        balance : -79611.9
    },
    {		
        country : "Italia",
        year : 2018,
        export : 465325.4,
        import : 426045.7,
        balance : 39279.7
    }
    
];

//##### GET #####//

app.get(BASE_API_URL+"/trade-stats",(req,res)=>{
    res.send(JSON.stringify(tradeStats,null,2));
});

app.get(BASE_API_URL+"/trade-stats/loadInitialData",(req,res)=>{
    if(tradeStats == 0){
        tradeStats.push(loadInitialDataTradeStats);
        res.sendStatus(201,"CREATED");
    }else{
        res.sendStatus(409,"CONFLICT");
    }
});

app.get(BASE_API_URL+"/trade-stats/:country", (req, res)=>{
    var countryName = req.params.country;
    filteredCountries = tradeStats.filter((c)=>{
        return(c.country == countryName);
    })
    if(filteredCountries == 0){
        res.sendStatus(404,"NOT FOUND");
    }else{
        res.send(JSON.stringify(filteredCountries,null,2));
    }
    res.sendStatus(200,"OK");
});

app.get(BASE_API_URL+"/trade-stats/:year", (req, res)=>{
    var tradeYear = req.params.year;
    filteredYear = tradeStats.filter((y)=>{
        return(y.year == tradeYear);
    })
    if(filteredYear == 0){
        res.sendStatus(404,"NOT FOUND");
    }else{
        res.send(JSON.stringify(filteredYear[0],null,2));
    }
    res.sendStatus(200,"OK");
});

app.get(BASE_API_URL+"/trade-stats/docs",(req,res)=>{
    res.redirect(API_DOC_TRADE);

});

//##### GET #####//

app.post(BASE_API_URL+"/trade-stats",(req,res)=>{
    tradeStats.push(req.body);
    res.sendStatus(201,"CREATED");
});

app.delete(BASE_API_URL+"/trade-stats", (req, res)=>{
    tradeStats = [];
    res.sendStatus(200,"OK");
});



//######################   API Jesús Vena Campos  ###############################//



app.get(BASE_API_URL+"/co2-stats",(req,res)=>{
    res.send(JSON.stringify(co2,null,2));

});

app.get(BASE_API_URL+"/co2-stats",(req,res)=>{
    res.redirect(API_DOC_PORTAL);

});


app.post(BASE_API_URL+"/co2-stats",(req,res)=>{
    co2.push(req.body);
    res.sendStatus(201,"CREATED");

});
//ESTO BORRA TODOS LOS RECURSO  
app.delete(BASE_API_URL+"/co2-stats", (req, res)=>{
    co2 = [];
    res.sendStatus(200,"OK");
});


app.delete(BASE_API_URL+"/co2-stats/:country", (req, res)=>{
    var countryName = req.params.country;
    co2.filter((c)=>{
        return(c.country!=countryName);
    })
    res.sendStatus(200,"OK");
});


app.get(BASE_API_URL+"/co2-stats/:country", (req, res)=>{
    var countryName = req.params.country;
    filteredCountries = co2.filter((c)=>{
        return(c.country == countryName);
    })
    if(filteredCountries == 0){
        res.sendStatus(404,"NOT FOUND");
    }else{
        res.send(JSON.stringify(filteredCountries[0],null,2));
    }

    res.sendStatus(200,"OK");


});

//##########################################

app.use("/",express.static('public'));

//----------------------------------------------------

app.listen(port, () =>{
    console.log(`Server ready at port ${port}`);
});
//----------------------------------------------------

