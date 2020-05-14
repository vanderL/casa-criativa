// usei o express pra criar e configurar meu servidor
const express = require("express")
const server = express()

const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729001.svg",
        title: "Leitura",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet",
        url: "https://instagram.com/vander_1"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729068.svg",
        title: "Videochamadas",
        category: "Socialização",
        description: "Lorem ipsum dolor sit amet",
        url: "https://instagram.com/vander_2"
    },    
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729042.svg",
        title: "Maratonar filmes",
        category: "diversão",
        description: "Lorem ipsum dolor sit amet",
        url: "https://instagram.com/vander_3"
    },    
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729028.svg",
        title: "Churrasco para um",
        category: "Lazer",
        description: "Lorem ipsum dolor sit amet",
        url: "https://instagram.com/vander_1"
    },    
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729021.svg",
        title: "Jogos",
        category: "Diversão",
        description: "Lorem ipsum dolor sit amet",
        url: "https://instagram.com/vander_1"
    },
]



// configurar arquivos estáticos (css, script, imagens)
server.use(express.static("public"))

//npm i nunjucks -> para instalar
//configuração do nunjuncks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// criei uma rota /
// e capturo o pedido do cliente para responder
server.get("/", function(req, res){

    const reversedIdeas = [...ideas].reverse()

    let lastIdeas = []
    for (let idea of reversedIdeas) {
        if(lastIdeas.length < 2){
            lastIdeas.push(idea)
        }
    }

  //  console.log(lastIdeas.length)

    return res.render("index.html", { ideas: lastIdeas })
})

server.get("/ideias", function(req, res){

    const reversedIdeas = [...ideas].reverse()
    return res.render("ideias.html", { ideas: reversedIdeas})
})

// liguei meu servidor na porta 3000
// npm i nodemon - ligar o servidor automaticamente a cada alteração
server.listen(3000)