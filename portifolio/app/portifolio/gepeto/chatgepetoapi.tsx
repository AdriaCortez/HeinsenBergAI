
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

        fetch("http://localhost:7777/validar", {
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            setUser(data.user);
        });

    }, []);

    useEffect(() => {

        if(user) {
            Historico();
        }
    
    }, [user]);

   const RespostaDaApi = async (_id: any) => {
         console.log('Verificando dados cadastrados...')

    try {

        const tscpcndc = await fetch(`http://localhost:3847/gepeto/${_id}`, { //tspcndc = To Sem Criatividade Pra Criar o Nome Dessa Const
          credentials: "include",
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
        credentials: "include",
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
    
    if(!user) {
        console.log('Não há usuário.')
        return;
    } 

    try {
        const historyApi = await fetch("http://localhost:3847/chat/historico", {
        method: 'GET',
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            
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

   const logout = async () => {
    await fetch("http://localhost:7777/logout", {
        method: "POST",
        credentials: "include"
    });

    setUser(null);
    navigate("/");
    
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