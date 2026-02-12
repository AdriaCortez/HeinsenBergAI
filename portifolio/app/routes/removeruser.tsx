"use client";

import ChatRenderizado from '../portifolio/Renderizados/gepetoTela';
import { useNavigate } from "react-router-dom";

export default function RotaLogin() {

    const navigate = useNavigate();

    const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/enter")
  }

    return (
        < ChatRenderizado

        logout={logout}
        
        />
    )
}