import express from 'express' //sem esse import eu não tenho acesso às funções do express
import mongoose from 'mongoose';
import cors from "cors";
import { ObjectId } from 'mongodb';

const app = express(); 
const port = process.env.PORT || 3846; //A porta que o servidor escuta; O environment variable PORT muda conforme o ambiente e são acessados pelo node.

const { Schema, model } = mongoose;

//Schema = define a estrutura de um documento dentro de uma coleção no MongoDB. Ele organiza.
//Model = é a interface entre o código e o MongoDB e vai ligar os dois. Responsável pelo CRUD e o objeto que representa a coleção do banco de dados.
//Portiflio vira a coleção portifolios dentro do MongoDB.

const portifolioSchema = new Schema({
  nomeCompleto: String,
  cpf: String,
  data: String,
}); //O schema define que todos os valores colocados em cada uma das constantes sejam strings 

const mensagemSchema = new Schema({
  campoDigitado: String,
})

const Portifolio = model('Portifolio', portifolioSchema); //Define que o nome do model é portifolio usando um schema específico

/*Nota: Aí dá pra fazer Portifolio.create, find, deleteOne e tudo mais*/

//Caminho pra conectar ao banco de dados (disponibilizado no mongo pra web):
const uri = process.env.MONGO_URI;

app.use(express.json()); //Lê o Json que chega na requisição, transforma em um objeto JavaScript e coloca em req.body

app.use(cors({
  origin: [ //origin porque é onde as requisições vão ser feitas
    
    "http://localhost:5174",
    "http://localhost:3846",
    "http://localhost",

  ], //Permite que essas portas acessem o backend

  methods: ["GET", "POST", "DELETE", "PUT"],
}));

app.options("/delete-portifolio", cors());


app.get('/', (req, res) => {
  res.send('Hello World!')
}); //define uma rota (no caso '/' que é a rota raiz e envia uma resposta pra quem acessou a rota)


//cria a rota ('/save-portifolio') que vai pegar os dados do reac
app.post('/save-portifolio', async (req, res) => { 

  try { 
   const portifolio = await Portifolio.create({ //o banco vai criar um novo documento no Mongo contendo um objeto com os dados enviados pelo cliente
      nomeCompleto: req.body.nomeCompleto, //re.body é o corpo da requisição.
      cpf: req.body.cpf,
      data: req.body.data,
    });

    console.log('Portifolio Criado:', portifolio); //se tudo der certo o schema "portifolio" vai ser criado 

    res.json({
      message: "Portifólio salvo!",
      portifolio,
    }); //O servidorr manda uma mensagem no formato Json pra informar que o portifolio foi salvo.

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao salvar", error: err });
  }
}); 

app.delete('/delete-portifolio-data', async (req, res) => {
  try { 
    const idDelete = req.body._id;
    const portifolio = await Portifolio.findByIdAndDelete(idDelete); //o banco vai deletar o último dado criado com o sort

    if(!portifolio) { //'!' Vai no portifolio e verifica se ele tá vazio
      // Se não encontrou e não deletou nada, retorna erro 404 no console
      return res.status(404).json({ message: "Cadastro não encontrado, conferir console."})
    } //se nada for deletado, retorna um status 404 com a mensagem cadastrp não encontrado

    console.log('Portifolio deletado da tabela', portifolio); //mostra no console a operação realizada 

    res.json({
      message: "Portifólio deletado da tabela!", portifolio,
    }); //O servidor manda uma resposta informando que deletou.

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao deletar. Tente novamente", error: err });
  }
}); //Caso não dê cert, retorna um erro 500

app.put('/update-portifolio', async (req, res) => {
  try {

     const idUpdate = req.body._id;
     const atualizacao = await Portifolio.findByIdAndUpdate(
      idUpdate,
      {
        nomeCompleto: req.body.nomeCompleto,
        cpf: req.body.cpf,
        data: req.body.data,
      }, //Identifica quem o usuário quer atualizar pelo id, procura apenas 1 documento


      {
         new: true//atualiza novas informações
      }
    );

    console.log('Atualizado com sucesso', atualizacao);
    res.json(atualizacao); 

  } catch (err) {
    console.error(err);
    res.status(500).json({message:"Erro ao tentar atualizar informações. Tente novamente", error: err});
  }
});

app.get('/read-portifolio', async (req, res) => {
  try {
     const achado = await Portifolio.find( //find é uma função do mongoose
      {}, //Aqui ele vai tentar encontrar todos os cadastros criados

     );

    console.log('Documento criado:', achado); //retorna no console
    res.json(achado);

  } catch (err) {
    console.error(err);
    res.status(500).json({message:"Erro: Não foi possível fazer a leitura do portifólio enviado. Tente novamente", 
    error: err});
  }
});



// FUNÇÃO PARA INICIAR O SERVIDOR

async function start() {
  try { //tenta rodar o código

    //Função pra conectar com o MongoDB
    await mongoose.connect(uri, { //Uri foi declarado ali em cima
      serverSelectionTimeoutMS: 15000,
    }); //Espera até 15 segundos pra conectar

    console.log("Mongoose conectado com sucesso!");

    app.listen(port, () => {
      console.log(`Express na porta ${port}`);
    }); //Mostra no console a porta que o express está

  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
  } //Passando os 15 segundos, retorna um erro
}


//Inicia o servidor
start();

/*Aqui criamos um servidor express
    Definindo a porta 3000 e mostrando que o servidor escuta as requisições nessa porta
    Define a estrutura dos documentos (tipo string)
    Depois ele vai criar uma coleção
    Conecta ao Mongo
    Criamos a rota post que recebe os dados do front end (react)
    Usamos o Model Portifolio pra criar um novo documento no banco
    Salva no Mongo
    Manda uma resposta em JSON indicando que o portifolio foi salvo.*/