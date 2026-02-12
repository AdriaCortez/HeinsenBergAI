//erro pra quando a página estiver em manutenção

export default function Erro() {
    return (
        <>

         <section className="max-w-2xl mx-auto py-10">
            <h1 className="text-4xl font-bold mb-8">
                503 - SERVICE UNAVAILABLE 
            </h1>
        <p>Oh não, parece que essa tela ainda está em manutenção.
            Volte outra hora!
        </p>

        </section>

        </>
        
    )
}