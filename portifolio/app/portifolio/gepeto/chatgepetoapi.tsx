
"use client";

//Código para colocar as chaves da API do chatGPT.
import { useEffect } from 'react'
import { useState } from 'react';
import ChatRenderizado from '../Renderizados/gepetoTela';
import { useNavigate, useLocation } from "react-router-dom";
import { aviso } from '../notificacoes/alertas';

export default function Chat() {

    const [campoDigitado, setCampoDigitado] = useState('');
    const [Mensagem, setMensagem] = useState <any[]>([]);
    const [user, setUser] = useState<any | null>(null);
 
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        aviso('');
    }, [])

    useEffect(() => { //useEffect pra rodar só quando o código for montado.

        const params = new URLSearchParams(window.location.search); //procura os parâmetros passados pela url
        const userURI = params.get('user'); //busca o usuário 
        const action = params.get('action'); //Busca se o usuário tá logado através da ação (login ou logout)
        const stored = localStorage.getItem("user");

        if(userURI === 'logout' || action === 'logout') {
            console.log("DESLOGADO! - Removendo dados...")
            localStorage.removeItem("user");
            localStorage.removeItem("token");

            navigate('/enter');
            return;
        }

        if(userURI) {

            try {

            const URIid = JSON.parse(decodeURIComponent(userURI)); //decodifica os dados passados na url
            
            setUser(URIid); 
            localStorage.setItem("user", JSON.stringify(URIid)); //salva os dados para não se perderem se a página for atualizada

            window.history.replaceState({}, document.title, "/chat"); } catch (err) {
                console.error("Erro processando os dados do usuário:", err)
            } //window.history.replaceState({}, document.title, "/chat") limpa a URL depois de processar os dados do usuário.
            
            //limpa a url

        } else if(stored) {

            try {
            setUser(JSON.parse(stored)) } catch (err) {
                console.log("Erro com os dados do localStorage:", err)
            }
            
            //se não tiver na url, ele tenta no que tá no localStorage
        }

    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token")

        if(token) {
            Historico();
        }

    }, []);

   const RespostaDaApi = async (_id: any) => {
         console.log('Verificando dados cadastrados...')

    try {

        const tscpcndc = await fetch(`http://localhost:3847/gepeto/${_id}`, { //tspcndc = To Sem Criatividade Pra Criar o Nome Dessa Const

          method: "GET", //GET pra ler os dados enviados ao servidor

        });
 
        const Visualizar = await tscpcndc.json(); //Pega a resposta da API em JSON
        console.log("Status:", Visualizar.status, "Tipo:", typeof Visualizar.status); //se o servidor funcionar ele mostra o status
        console.log('Dados renderizando normalmente na tela') //mostra no console a resposta do servidor, CASO funcione.

        if(Visualizar.status === "concluído" && Visualizar.resposta) {
            setMensagem(prev => [...prev, { //prev pega todas as mensagens que já estão na tela e adiciona a resposta do gepeto no final
                autor: "gepeto",
                texto: Visualizar.resposta}]); 
            return;
            
            //se o status for "concluído" o chat atualiza.
        } else {

            setTimeout(() => {
            RespostaDaApi(_id)}, 1000); 
            
        };
    
    } catch (err) {
        alert('Algo deu errado! Erro [heinsenbergAPI]: ' + err);
        console.error('ERRO na resposta da API')
       setTimeout(() => RespostaDaApi(_id), 3000)//se der erro, ele pega as mensagens da tela também. e retorna um erro.

    }
   }

    const Submit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log('Enviando mensagem...');
        console.log('Mensagem enviada', campoDigitado)

    try {

       const apiMensagem = await fetch ('http://localhost:3847/chat/nova-mensagem', {
        method: "POST", //Campo para enviar a mensagem para a API 

        headers: {
       "Content-Type": "application/json",
      },

      body: JSON.stringify({campoDigitado: campoDigitado})
    });

    const enviado = await apiMensagem.json();
    console.log('Mensagem do usuário:', enviado);

    setMensagem (prev => [...prev, {
        autor: "user",
        texto: campoDigitado
    }]); //adiciona a mensagem ao array 
    setCampoDigitado(''); //limpa o campo após enviar a mensagem

    if(enviado.mensagem && enviado.mensagem._id) {
        RespostaDaApi(enviado.mensagem._id)
    } 

} catch  (err) {
    console.log('Opa! Algo deu errado na conexão', err);
}

}

 const Historico = async () => {
    
    const token = localStorage.getItem("token")
    if(!token) {
        console.log('Não há usuário.')
        return;

    } 

    try {
        const historyApi = await fetch("http://localhost:3847/chat/historico", {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }

        });

        const historicoObtido = await historyApi.json();
        console.log(historicoObtido)

        const mensagensFormatadas = [...historicoObtido] //dentro de [] pra não mudar o endereço do array original
        .reverse()
        .map((item: any) => ({
            autor: item.role === "user" ? "user" : "gepeto",
            texto: item.content,
        }));

        setMensagem(mensagensFormatadas)


    } catch (err) {
        console.log("Algo deu errado ao obter o histórico")

    } 
    
 }

 const voltar = () => {
      const from = location.state?.from; 

        if (from === "portifolio") { 
            navigate ("/portifolio")
        } else if (from === "inicio" && from === "enter" && from !== "portifolio") {
            navigate ("/")
        } else {
            navigate (-1)
        }
   }

   const entre = () => {

    navigate ("/enter")

   }

   const profile = () => {

    navigate ("/perfil")

   }

   const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
   }

    return (
        <>
        < ChatRenderizado  
        campoDigitado={campoDigitado}
        setCampoDigitado={setCampoDigitado}
        Mensagem={Mensagem}
        Submit={Submit}
        voltar={voltar} 
        entre={entre}
        user={user}
        setUser={setUser}
        logout={logout}
        profile={profile} />

        </>
    )

}

/* Em geral, esse código é responsável por gerenciar o chat, não só isso como também permitir a entrada do usuário passando as 
informações de uma porta pra outra através da URL e permitindo que ele continue logado. */ 