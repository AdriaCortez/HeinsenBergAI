"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Inicio() {
  return (
    <>
      <div className="min-h-screen bg-black text-gray-100 font-sans flex flex-col items-center justify-center p-6 overflow-hidden">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-pink-600/10 blur-[120px] rounded-full pointer-events-none" />

        <main className="max-w-4xl w-full text-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tighter"
          >
            Opa! <span className="text-pink-600">Você encontrou uma nova rota.</span>
          </motion.h1>


        </main>

        <footer className="absolute bottom-8 text-[10px] text-gray-700 uppercase tracking-[0.2em] font-medium">
          POWERED by Adria Cortez
        </footer>
      </div>
    </>
  );
}
