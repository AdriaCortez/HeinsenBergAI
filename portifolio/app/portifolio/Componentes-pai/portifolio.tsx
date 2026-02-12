"use client";

import { useState } from 'react'; //o Hook UseState monitora os valores que tem no códgo e atualiza tudo automaticamente quando eles mudarem.
//O Hook useRef vai dar a ordem pro código mostrar o modal
import { useEffect } from 'react'; 
import PortifolioForm from "../Renderizados/portifolioForm";
import { useLocation } from 'react-router';
import { useNavigate} from "react-router-dom";
import { sucesso, erro } from '../notificacoes/toasts';

export default function Portifolio() {


  const [nomeCompleto, setNomeCompleto] = useState(''); 
  const [cpf, setCPF] = useState(''); 
  const [data, setData] = useState(''); 
  const [registros, setRegistros] = useState<any[]>([]); //função que atualiza o registro, o array pode ter qualquer dado (any) - utilizado no ler() que atualiza os dados na tela
  const [valoresEditados, setValoreseditados] = useState(null) //essa função atualiza os valores editados 

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => { //location state serve pra levar os dados pra outra página e faze-la m=entrar em modo edição
    if (location.state) {
      setNomeCompleto(location.state.nomeCompleto)
      setCPF(location.state.cpf)
      setData(location.state.data)
      setValoreseditados(location.state._id)
    } 
  }, []) //[] para rodar apenas 1 vez quando o componente for montado

  
  const handleSubmit = async (e) => { 
    e.preventDefault()

    console.log('Criando registro...')
    console.log('Nome enviado:', nomeCompleto); 
    console.log('CPF enviado:', cpf);
    console.log('Data enviada:', data);

    if(valoresEditados) { //recebe o id e put e executado
      console.log('Atualizando registros cadastrados...') 

      try {

        const api2 = await fetch("http://localhost:3846/update-portifolio", {
          method: "PUT",
          headers: {
         "Content-Type": "application/json", },

          body:  JSON.stringify({nomeCompleto: nomeCompleto, cpf: cpf,  data: data, _id: valoresEditados})
         });

         const apiresponse = await api2.json();
         console.log(apiresponse);

         navigate("/trabalhos");

         sucesso();

        } catch {

          erro();

        }

      } else { 

     try {   

     const response = await fetch("http://localhost:3846/save-portifolio", { 

      method: "POST", 
      headers: {
      "Content-Type": "application/json", 
    }, 

    body:  JSON.stringify({nomeCompleto: nomeCompleto, cpf: cpf,  data: data}),
  }); 
  
    
     const dataResponse = await response.json(); 
     console.log(dataResponse);

     navigate("/trabalhos")

     sucesso()
    
     } catch {

      erro();
      
     }
    
    }
    
     setValoreseditados(null);
     setNomeCompleto("");
     setCPF("");
     setData("");

    ler();
  }

   const ler = async () => { //essa função também serve pra atualizar a tabela
         console.log('Verificando dados cadastrados...')

        const api2 = await fetch("http://localhost:38/read-portifolio", {

          method: "GET",

        });
 
        const lerResposta = await api2.json(); 
        console.log('Dados renderizando no console') 
        setRegistros(lerResposta); 
   }

   const paginainicial = () => {

    const from = location.state?.from;

    if (from === "inicio") {
        navigate ("/") } else if (from === "trabalhos") {

        navigate ("/trabalhos")
    } else {
        navigate (-1)
    }
   }

 

  return (

    <>

    <PortifolioForm
      nomeCompleto={nomeCompleto}
      cpf={cpf}
      data={data}
      setNomeCompleto={setNomeCompleto}
      setCPF={setCPF}
      setData={setData}
      handleSubmit={handleSubmit}
      valoresEditados={valoresEditados} 
      paginainicial={paginainicial}
      />

    </>

    
  
  ); //removi valores editados

}

