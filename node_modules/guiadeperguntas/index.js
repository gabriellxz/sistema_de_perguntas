const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const questionModel = require("./database/question");
const responseModel = require("./database/response");
const app = express();

//CONEXÃO NO BANCO DE DADOS
connection
    .authenticate()
    .then(() => {
        console.log("Conexão com o banco feita com sucesso!");
    })
    .catch((error) => {
        console.log(error)
    })

//DIZ PARA O EXPRESS O QUE VAI SER USADO PARA RENDERIZAR O HTML
app.set("view engine", "ejs");
app.use(express.static("public"));

//BODYPARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//ROTAS
app.get("/", function (req, res) {
    questionModel.findAll({
        raw: true, order: [
            ["id", "DESC"]
        ]
    }).then(questions => {
        res.render("index", {
            questions: questions
        });
    }).catch(error => {
        res.render("index", {
            error: "Não foi possível buscar as perguntas..."
        })
        throw error
    })
});

app.get("/fazerPergunta", function (req, res) {
    res.render("askQuestion");
});

app.get("/pergunta/:id", function (req, res) {
    var id = req.params.id;

    questionModel.findOne({
        where: { id: id }
    }).then(question => {
        if (question) {

            responseModel.findAll({
                where: { questionId: question.id },
                raw: true, order: [
                    ["id","DESC"]
                ]
            }).then(response => {
                res.render("questionId", {
                    question: question,
                    response: response
                })
            })

        } else {
            res.redirect("/");
        }
    })
});

app.post("/response", function (req, res) {
    var idQuestion = req.body.questionId;
    var body = req.body.body;

    responseModel.create({
        questionId: idQuestion,
        body: body
    }).then(() => {
        res.redirect("/pergunta/" + idQuestion);
    }).catch(error => {
        throw error;
    })

})

app.post("/saveAsk", function (req, res) {

    var title = req.body.title;
    var description = req.body.description;

    questionModel.create({
        title: title,
        description: description
    }).then(() => {
        res.redirect("/");
    }).catch((error) => {
        console.log("Não foi possível salvar sua pergunta... " + error);
    })
});

app.listen(3000, () => {
    console.log("Servidor rodando...");
});