// usei o express pra criar e configurar meu servidor
const express = require("express")
const server = express()

const db  = require("./db")
/*const ideas = [
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
]*/



// configurar arquivos estáticos (css, script, imagens)
server.use(express.static("public"))

// habilitar uso do req.doby
server.use(express.urlencoded({ urlencoded: true }))

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

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }
        
        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if(lastIdeas.length < 2){
                lastIdeas.push(idea)
            }
        }
    
        //  console.log(lastIdeas.length)
        return res.render("index.html", { ideas: lastIdeas })
    })   
})

server.get("/ideias", function(req, res){

    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }

        const reversedIdeas = [...rows].reverse()
        return res.render("ideias.html", { ideas: reversedIdeas})
    }) 
})

server.post("/", function(req, res){
    
//Insert
    const query = `
    INSERT INTO ideas(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);
`
    
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link    
    ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro no Banco de Dados!")
        }

        return res.redirect("/ideias")
    })

})

// liguei meu servidor na porta 3000
// npm i nodemon - ligar o servidor automaticamente a cada alteração
server.listen(3000)