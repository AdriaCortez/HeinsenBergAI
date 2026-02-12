import express from 'express'
import cors from "cors";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser"

dotenv.config();

const app = express(); 
const port = 3847; 

const KEY = process.env.GEPETO_API_KEY;
const TOKEN = process.env.GEPETO_API_AUTH_TOKEN;
const uri = process.env.MONGO_URI_GEPETO;

const { Schema, model } = mongoose;

const mensagemSchema = new Schema({

  userId: {
    type: Schema.Types.ObjectId, required: false },

    campoDigitado: String, 
    resposta: String,
  status: {
      type: String,
      default: "Aguardando..."
  }

}); 

const historicoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId, required: true },
    role: { type: String, enum: ["user", "gepeto"]}, //enum garante que quem vai responder é o usuário ou a IA
    content: String, 
    createdAt: { type: Date, default: Date.now()}

  });

const Mensagens = model('Mensagens', mensagemSchema); 
const Historico = model('Historico', historicoSchema);

console.log("Dotenv functionando na porta:", port);

app.use(express.json()); 
app.use(cookieParser());
app.use(cors({
  origin: [ 
    "http://localhost:5174",
    "http://localhost:3847",
    "http://localhost",

  ],
  methods: ["GET", "POST", "DELETE", "PUT"],
}));

function auth (req, res, next) {
   const token = req.cookies.auth; //autenticação do token é feita com cookies
  
    if(!token) {
      return res.status(401).json({ error: "não autenticado" })
    } //não teve cookie? Não autentica
  
    try { 
      
      const decoded = jwt.verify(token, access); 
  
      req.userId = decoded.id;
      next(); //next passa para o próximo middleware
  
    } catch (err) {
      return res.status(401).json({ error: "Token inválido"});
    }
}

 app.post('/chat/nova-mensagem', auth, async (req, res) => {  

    let userId = null;
    const auth = req.headers.authorization;

    if(auth) {
      try {
        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_TEST);
        userId = decoded.id;
      } catch (err) {

        console.log("Como não há usuário, o histórico não está sendo salvo.")

      }
    }

    try { 
     const mensagem = await Mensagens.create({ 
        userId: userId,
        campoDigitado: req.body.campoDigitado, 
    });

    if (userId) {

      await Historico.create({
      userId,
      role: "user",
      content: req.body.campoDigitado
    }) //cria um historico
    
    }

    console.log('Mensagem enviada:', mensagem); 

    res.json({
      message: "MENSAGEM ENVIADA COM SUCESSO!", 
      mensagem,

    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao enviar mensagem (500)", error: err });
  }
}); 

app.get('/gepeto/:id', async (req, res) => { 

  let userId = null;
  
  const auth = req.headers.authorization;

    if(auth) {
      try {
        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_TEST);
        userId = decoded.id;
      } catch (err) {

        console.log("Como não há usuário, o histórico não está sendo salvo.")

      }
    }
  
  console.log('Conectando com o GEPETO API...')

    try { 

      const retorno = await Mensagens.findById(req.params.id);

      if(!retorno) {
        return res.status(404).json({error: 'HMmm... Não encontrei a mensagem. Porta 404!'})
      }

      if (retorno.status === "concluído") {
        return res.json({
            status: "concluído",
            resposta: retorno.resposta
        })
      }

     const resposta = await fetch('http://geppetto.cfq.org.br:44401/api/message', {
          method: 'POST', //O metodo é post pra reenviar a resposta da API
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${TOKEN}`, 
          },
          body: JSON.stringify({
            message: retorno.campoDigitado //envia a pergunta
          })
        });

        console.log("status Gepeto:", resposta.status);

        const servidor = await resposta.text();
        console.log("Resposta do servidor Gepeto:", servidor);

        let ok; //variável vazia pra guardar o texto
          try { //verifica se a resposta é JSON ou HTML 
            ok = JSON.parse(servidor);
          } catch (err) {
            console.log("Não é JSON:", servidor); //retorna o texto caso não estiver no formaro corret
            throw err;
          }

      const texto = ok.request_data?.result || ok.message?.content || ok.response || ok.resposta || "Opa! A resposta quase retornou em JSON. Verifique o backend ou o Token da IA (AUTHORIZATION DENIED)."; //tenta achar a resposta em todos os lugares possíveis pra caso a API mude ou haja erros
      
      await Mensagens.findByIdAndUpdate(req.params.id, { //encontra a pergunta pelo id, e atualiza o estado com a resposta

        resposta: texto,  
        status: "concluído"
      });

      res.json({
        status: "concluído",
        resposta: texto
      }); //resposta pro front-end

      //Nota; Response não foi declaradio porque veio do servidor.

      if(userId) {

      await Historico.create({
        userId,
        role: "gepeto",
        content: texto
      }); //cria um historico

    }

    } catch (err) {

    res.status(500).json({message: "Erro ao receber resposta (500)", error: err});
 
    } //se NADA der certo, dá erro 500
}); 

app.get('/chat/historico', autenticarToken, async (req, res) => {
  try {
    const historico = await Historico.find({ userId: req.userId})
    .sort({ createdAt: -1 }); //ordena do mais recente pro mais antigo

    if(historico.length === 0) {
      return res.status(404).json({message: "Não há histórico para o usuário (404)"})
    }

    res.json(historico);
    
  } catch (err) {
    res.status(500).json({message: "Erro ao buscar histórico (500)", error: err});
  }

});

async function start() {
  try { 

   await mongoose.connect(uri, { 
          serverSelectionTimeoutMS: 15000,
    }); 
    
    console.log("Mongoose conectado com sucesso!");

    app.listen(port, () => {
      console.log(`Express na porta ${port}`);
    }); 
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
  } 

}

start()
