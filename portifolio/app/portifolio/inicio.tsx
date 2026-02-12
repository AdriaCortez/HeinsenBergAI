import { Link } from "react-router";
import { motion } from "framer-motion";

export default function Inicio() {
  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* Background decorativo (Glow sutil) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Conteúdo Principal */}
      <main className="max-w-4xl w-full text-center z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tighter"
        >
          Bem-vindo ao <span className="text-blue-600">PORTIFÓLIO</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-400 text-lg md:text-xl mb-12 font-light"
        >
          Explore portfólios, cadatsros e interaja com inteligência artificial.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Link to="/portifolio" className="group">
            <div className="h-full p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-600/50 hover:bg-gray-900 transition-all duration-300 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">Portfólio</h3>
              <p className="text-sm text-gray-500 mb-6">Cadastre um portifolio com suas informações</p>
              <span className="px-4 py-2 bg-blue-600/10 text-blue-500 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-600/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                Acessar
              </span>
            </div>
          </Link>

          {/* Card Trabalhos */}
          <Link to="/trabalhos" className="group">
            <div className="h-full p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-600/50 hover:bg-gray-900 transition-all duration-300 backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors">Trabalhos</h3>
              <p className="text-sm text-gray-500 mb-6">Acesse os trabalhos cadastrados</p>
              <span className="px-4 py-2 bg-blue-600/10 text-blue-500 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-600/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                Explorar
              </span>
            </div>
          </Link>

          <Link to="/chat" className="group">
            <div className="h-full p-8 rounded-2xl bg-blue-600/5 border border-blue-600/20 hover:border-blue-600 hover:bg-blue-600/10 transition-all duration-300 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-3 right-3 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-blue-500 group-hover:text-blue-400">Heisenberg AI</h3>
              <p className="text-sm text-gray-500 mb-6">Converse agora com a versão beta da nova inteligência artificial.</p>
              <span className="px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(37,99,235,0.4)] group-hover:scale-105 transition-transform inline-block">
                Iniciar Chat
              </span>
            </div>
          </Link>
        </motion.div>
      </main>

      {/* Footer minimalista */}
      <footer className="absolute bottom-8 text-[10px] text-gray-700 uppercase tracking-[0.2em] font-medium">
        POWERED by Adria Cortez
      </footer>
    </div>
  );
}