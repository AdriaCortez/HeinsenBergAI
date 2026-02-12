import { Toaster } from "react-hot-toast"

export default function CadastroLogin(config: any) {

    const {
        email,
        senha,
        setEmail,
        setSenha,
        SubmitSubs,
        setNome,
        nome

    } = config


    return (
        <>

         <section className="max-w-2xl mx-auto py-10">

            <Toaster position="top-center" />
            <h1 className="text-4xl font-bold mb-8">
                Cadastre-se 
            </h1>
            <form onSubmit={SubmitSubs} className="space-y-6">

                <label className="block text-lg font-medium mb-2">
                    Nome:
                </label>
                <input
                    type="text"
                    value={nome}

                    /*O valor colocado no input é controlado pelo react que define o "nomeCompleto"*/

                    onChange={(e) => setNome(e.target.value)} 

                    /*onChange = É um evento do react que dispara cada vez que o usuário digita alguma letra e atualiza o estado*/
                    /*e = evento/objeto do eventoAC, target = objeto, value = é o que o usuário colocou*/

                    placeholder="Seu nome completo"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />


                <label className="block text-lg font-medium mb-2">
                    E-mail:
                </label>
                <input
                    type="email"
                    value={email}

                    /*O valor colocado no input é controlado pelo react que define o "nomeCompleto"*/

                    onChange={(e) => setEmail(e.target.value)} 

                    /*onChange = É um evento do react que dispara cada vez que o usuário digita alguma letra e atualiza o estado*/
                    /*e = evento/objeto do eventoAC, target = objeto, value = é o que o usuário colocou*/

                    placeholder="nome.exemplo@mail.com"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <label className="block text-lg font-medium mb-2">
                    Senha:
                </label>
                <input
                    type="password"
                    value={senha}

                    /*O valor colocado no input é controlado pelo react que define o "nomeCompleto"*/

                    onChange={(e) => setSenha(e.target.value)} 

                    /*onChange = É um evento do react que dispara cada vez que o usuário digita alguma letra e atualiza o estado*/
                    /*e = evento/objeto do eventoAC, target = objeto, value = é o que o usuário colocou*/

                    placeholder="insira sua senha"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                 <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-green-500 transition"
                >
                    Entrar
                </button>

            </form>
         </section>
        
        </>
    )
}