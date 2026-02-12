"use client";
import PerfilRenderizado from "~/paginadeperfil/perfilrenderizado"
import { simDeletar } from "~/modais/alertas";
import { useNavigate } from "react-router-dom";

export function Perfil() {

    const navigate = useNavigate();

    const deletarconta = async (senha: string) => {

        const token = localStorage.getItem("token");

        if(!token) {
            console.log("Token não encontrado. Usuário não autenticado.");
            return;
        }

        try {
        console.log("Deletando conta...")

        const apiDeletar = await fetch("http://localhost:7777/deletarconta", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                senha,
            })
        });

        const data = await apiDeletar.json();

        if(!apiDeletar.ok) {
            alert("Erro ao deletar conta: " + data.error);
            return;
        }

        simDeletar('');
        localStorage.clear();
        window.location.href = "http://localhost:5174/chat?user=logout";

        console.log("Conta deletada com sucesso:", data); } catch (err) { 
            console.log("Ocorreu algum erro ao deletar conta", err);
        }

        
    }
    return (

        <PerfilRenderizado 
        deletarconta={deletarconta}/>

    )
}