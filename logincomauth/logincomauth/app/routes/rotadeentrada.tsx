"use client";

import { useNavigate, useLocation } from "react-router-dom";
import Entreoucadastre from "~/paginasiniciais/entreoucadastre"

export default function BotoesDeEntrada() {
    const navigate = useNavigate();
    const location = useLocation();

       const loginPage = () => {
       navigate ("/login")
   }

       const SubsPage = () => {
       navigate ("/subscribe")
   }


    return (
        <>

        <Entreoucadastre
        loginPage={loginPage}
        SubsPage={SubsPage}
        />

        </>
    )
} 