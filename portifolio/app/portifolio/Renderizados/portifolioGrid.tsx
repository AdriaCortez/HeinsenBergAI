import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function PortifolioGrid(Configuracoes: any) { 
    const { registros, deleteData, editarDados, voltar } = Configuracoes;

    return (
        <div className="min-h-screen bg-black text-gray-100 font-sans p-6 md:p-12 relative overflow-hidden">
            <Toaster position="top-center" />
            
            {/* Efeito de iluminação de fundo */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                
                {/* Header da Seção */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-4xl font-bold tracking-tight"
                        >
                            Trabalhos <span className="text-blue-600 font-light">Cadastrados</span>
                        </motion.h1>
                        <p className="text-gray-500 mt-2">Gerencie os portifólios cadastrados anteriormente.</p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => voltar()} 
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 border border-gray-800 text-gray-300 rounded-xl hover:bg-gray-800 hover:text-white transition-all w-fit"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        Voltar
                    </motion.button>
                </header>

                {/* Estado Vazio */}
                {registros?.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 border-2 border-dashed border-gray-900 rounded-3xl"
                    >
                        <p className="text-gray-600 text-lg">Nenhum registro encontrado. Inicie um novo cadastro.</p>
                    </motion.div>
                )}

                {/* Grid de Cards (Substituindo a Tabela) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {registros?.map((registro: any, index: number) => (
                            <motion.div
                                key={registro._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-900/40 backdrop-blur-md border border-gray-800 p-6 rounded-2xl hover:border-blue-600/40 transition-all group relative overflow-hidden"
                            >
                                {/* Nome e Badge */}
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-white group-hover:text-blue-500 transition-colors truncate">
                                        {registro.nomeCompleto}
                                    </h3>
                                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">
                                        ID: {registro._id?.slice(-6) || "NO-ID"}
                                    </span>
                                </div>

                                {/* Dados */}
                                <div className="space-y-3 mb-6">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-600 uppercase">CPF</span>
                                        <span className="text-sm font-medium text-gray-300">{registro.cpf}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-gray-600 uppercase">Nascimento</span>
                                        <span className="text-sm font-medium text-gray-300">
                                            {new Date(registro.data).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                </div>

                                {/* Ações */}
                                <div className="flex gap-3 border-t border-gray-800 pt-4">
                                    <button
                                        onClick={() => editarDados(registro)} 
                                        className="flex-1 flex justify-center items-center py-2 bg-blue-600/10 text-blue-500 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-sm font-bold"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => deleteData(registro._id, registro.nomeCompleto)}
                                        className="px-4 py-2 bg-transparent text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all text-sm"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}