"use client";

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sucesso, erro, naoexiste, incorreto } from '../modais/toasts';
import Login from '~/paginasdeloginoucadastro/loginForm';
export default function Logar() {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();
  
  const SubmitedToken = async () => { 

    const res = await fetch("http://localhost:7777/st", {
     method: "GET",
     credentials: "include"

  });

  if(!res.ok) {
    erro();
    throw new Error ("Token inválido");
  }

  const user = await res.json();

  sucesso();
  
  console.log("Usuário autenticado", user);

  navigate("/chat", { state: { user } });
}

   const HandleAuth = async (e: React.FormEvent) => {
    e.preventDefault()

    try { console.log('Verificando credenciais...')

    const apiLogin = await fetch("http://localhost:7777/auth-login", {
        method: 'POST', 
        headers: {
            "Content-type": "application/json", }, 

          credentials: "include",
          body: JSON.stringify({ email: email, senha: senha})
        } //fecha as especificações de fetch

    ); //fecha API LOGIN

     if(!apiLogin.ok) {
      erro();
      return;
     }

     await SubmitedToken();

     sucesso();

    } catch {
      erro();
    }
  } 

  return (
    <>

    <Login

    email={email}
    setEmail={setEmail}
    senha={senha}
    setSenha={setSenha}
    HandleAuth={HandleAuth}
    
    />
    

    </>
  )

}