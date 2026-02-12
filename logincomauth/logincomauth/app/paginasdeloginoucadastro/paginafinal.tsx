"use client";

import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Final(config: any) {
  const { Logout } = config;

  const location = useLocation();
  const navigate = useNavigate();

  const stateUser = location.state?.user;
  const storedUser = localStorage.getItem("user");
  const user = stateUser ?? (storedUser ? JSON.parse(storedUser) : null);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-pink-600/10 blur-[130px] rounded-full pointer-events-none" />

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full z-10 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tighter">
          {user ? (
            <>
              Bem-vindo, <span className="text-pink-600 uppercase">{user.nome}</span>!
            </>
          ) : (
            "Olá!"
          )}
        </h1>
        
        <p className="text-gray-500 mb-12 uppercase tracking-[0.3em] text-sm">
          Acesso autorizado 
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">

          <button
            type="button"
            onClick={Logout}
            className="w-full md:w-auto px-8 py-4 bg-transparent border border-blue-600/30 text-blue-500 rounded-xl font-bold uppercase tracking-widest hover:bg-pink-600/10 hover:border-pink-600 transition-all duration-300 cursor-pointer"
          >
            Encerrar sessão
          </button>


          <button
            type="button"
            onClick={() => navigate("/enter")}
            className="w-full md:w-auto px-8 py-4 bg-pink-600 text-white rounded-xl font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(219,39,119,0.4)] hover:bg-pink-500 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            Voltar pro início
          </button>
        </div>
      </motion.section>

      <footer className="absolute bottom-8 text-[10px] text-gray-700 uppercase tracking-[0.2em] font-medium">
        Sessão segura por JWT • Adria Cortez
      </footer>
    </div>
  );
}