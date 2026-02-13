"use client";
import PerfilRenderizado from "~/paginadeperfil/perfilrenderizado"
import { simDeletar } from "~/modais/alertas";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Perfil() {

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function validarUser() {
            try {
                const validation = await fetch("http://localhost:7777/validar", {
                    credentials: "include",
                });

                const data = await validation.json();

            } catch (err) {
                navigate("/login")
            }
        }
    })


    const navigate = useNavigate();

    const deletarconta = async (senha: string) => {

        try {
        console.log("Deletando conta...")

        const apiDeletar = await fetch("http://localhost:7777/deletarconta", {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
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