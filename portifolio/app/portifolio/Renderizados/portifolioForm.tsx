import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export default function PortifolioForm(Configuracoes: any) {
    const {
        handleSubmit,
        nomeCompleto,
        cpf,
        data,
        setNomeCompleto,
        setCPF,
        setData
    } = Configuracoes;

    return (
        <div className="min-h-screen bg-black text-gray-100 font-sans flex items-center justify-center p-6 relative overflow-hidden">
            <Toaster position="top-center" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-900/10 blur-[120px] rounded-full" />

            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-xl w-full bg-gray-900/30 backdrop-blur-xl border border-gray-800 p-8 rounded-3xl shadow-2xl z-10"
            >
                <header className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Cadastro de <span className="text-blue-600">Portfólio</span>
                    </h1>
                    <p className="text-gray-500 text-sm mt-2 font-light">
                        Insira suas informações para sincronizar com o Heisenberg AI.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-5">
                        {/* Nome Completo */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 ml-1">
                                Nome Completo
                            </label>
                            <input
                                type="text"
                                value={nomeCompleto}
                                onChange={(e) => setNomeCompleto(e.target.value)}
                                placeholder="Digite seu nome completo"
                                className="w-full bg-black/50 border border-gray-800 text-white px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all placeholder:text-gray-700 shadow-inner"
                                required
                            />
                        </div>

                        {/* CPF e Data em Grid para telas maiores */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 ml-1">
                                    CPF
                                </label>
                                <input 
                                    type='number'
                                    value={cpf}
                                    onChange={(e) => setCPF(e.target.value)}
                                    placeholder="000.000.000-00"
                                    className="w-full bg-black/50 border border-gray-800 text-white px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all placeholder:text-gray-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 ml-1">
                                    Nascimento
                                </label>
                                <input 
                                    type='date'
                                    value={data}
                                    onChange={(e) => setData(e.target.value)}
                                    className="w-full bg-black/50 border border-gray-800 text-white px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 transition-all appearance-none"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="flex-1 px-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.2)] transition-all"
                        >
                            Salvar Portfólio
                        </motion.button>
                        
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button" 
                            onClick={() => Configuracoes.paginainicial()} 
                            className="flex-1 px-6 py-4 bg-transparent text-gray-400 font-medium rounded-xl border border-gray-800 hover:bg-gray-800 hover:text-white transition-all"
                        >
                            Voltar ao Início
                        </motion.button>
                    </div>
                </form>
            </motion.section>
        </div>
    );
}