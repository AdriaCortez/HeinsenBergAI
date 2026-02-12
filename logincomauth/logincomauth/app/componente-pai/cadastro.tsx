"use client";

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sucesso, erro, jaexiste, naoexiste } from '../modais/toasts';
import  CadastroLogin from '../paginasdeloginoucadastro/cadastroForm'

export default function Subscribe() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [logged, setLogged] = useState(null);
  const [acesso, setAcesso] = useState<string>(''); //TOken salvo no LocalStorage

  const navigate = useNavigate();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const apiCadastro = await fetch("http://localhost:7777/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, senha: senha, nome: nome })
      });

      const data = await apiCadastro.json();

      if (!apiCadastro.ok) {
        console.error("Erro backend:", data);
        erro();
        return;
      } //tratamendo de erro pra caso ocorra algum erro na hora da inscrição.

      console.log("Cadastro enviado com sucesso:", data);
      sucesso();

      navigate("/login") //Cadastro foi validado? Vai direto pra login

    } catch (err) {
      console.error("Erro no fetch:", err);
      erro();
    }
  };

  const SubmitedToken = async () => { 


     if(!acesso) {
      throw new Error("TOKEN NOT FOUND! (Não encontrado)")
     }

    const res = await fetch("http://localhost:7777/st", {
     method: "GET",
     headers: {
      Authorization: `Bearer ${acesso}` //TOken padrão pdronizado pela RFC 6750 e adotado costumeiramente em OAuth 2.0. 
     },


  });

  if(!res.ok) {
    throw new Error ("Token inválido");
  }

  const user = await res.json();
  setLogged(user);

  console.log("Usuário autenticado", user);
  localStorage.setItem("user", JSON.stringify(user));

  sucesso()

}

useEffect(() => {
if (typeof window !== "undefined") { //roda if somente se localstorage não for undefined
  const tokenSalvo = localStorage.getItem("Token"); //le o token salvo no navegador
  setAcesso(tokenSalvo ?? "") //se for null ou undefined retorna ""
}


}) //Só lê o token salvo quando o código estiver rodando no navegador


useEffect(() => {
  if (acesso) {
    SubmitedToken().then(() => {
      console.log("sessão restaurada") //ao clicar em submited token, mesmo que o usuário dê f5 na página, o login não sai
    }).catch(() => {
      console.log("Token inválido.")
      localStorage.removeItem("Token")
      localStorage.removeItem("user");

      naoexiste();


    }) //se a api na rota /st der 401 ou 403 (token expirou, alterado ou usuário não existe mais, ele limpa a sessão e força o usuário a)

  } }, [acesso]
  
)
  return (

    <>   
    
     <CadastroLogin
      email={email}
      setEmail={setEmail}
      setSenha={setSenha}
      senha={senha}
      SubmitSubs={handleSubscribe}
      nome={nome}
      setNome={setNome}
    />

    </>

    


  );
}
