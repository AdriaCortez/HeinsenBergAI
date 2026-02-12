//Essa função define como é o objeto de registro no portifolio, indicando que ID pode ser qualquer coisa e os outros objetos são strings
//Tipa a lista de registros.
export type registro = {
    _id: any;
    nomeCompleto: string;
    cpf: string;
    data: string;
}

export type mensagens = { //pro Gepeto
    campoDigitado: string;
}