
import { use, useState } from 'react'; //o Hook UseState monitora os valores que tem no códgo e atualiza tudo automaticamente quando eles mudarem.
//O Hook useRef vai dar a ordem pro código mostrar o modal
import { useEffect } from 'react'; 


//-----PortifolioGrid vai receber as funções de deletar E editar------

//Essa função define como é o objeto de registro no portifolio, indicando que ID pode ser qualquer coisa e os outros objetos são strings
export type registro = {
    _id: any;
    nomeCompleto: string;
    cpf: string;
    data: string;
}



//define as propriedades o grid precisa saber
type Configuracoes = {
    registros: registro[]; //recebe uma lista do componente pai "portifolio", é o que vai ser mostrado na tabela
    onDelete: (_id: any) => void; //FUnção que o "portifolio" enviou pra cá
     /*significa que o grid não tem permissão pra deletar ou editar nada, ele só tem o botão.
      Então ele recebe a função de portifolio que recebe o ID e deleta o componente pai */
    onEditar: (registro: registro) => void;
}

export default function PortifolioGrid({registros, onDelete, onEditar}: Configuracoes) { /*aqui significa que o PortifolioGrid 
    recebe um objeto que tem o formato descrito em Type Configurações*/

   return (
     <>
 
      {registros.length > 0 && ( //Mostra tabela se tamanho dos registros for maior que 0

        <table className='w-full mt-8 border'> {/*Renderiza a tabela */}
          <thead> {/*Mostra o cabeçalho da tabela */}
            <tr> {/*linha da tabela */}
              <th className='border p-2'>Nome cadastrado:</th>
              <th className='border p-2'>CPF cadastrado:</th>
              <th className='border p-2'>Data de nascimento cadastrada:</th>
              <th className='border p-2'>Ações</th>

            </tr>
          </thead>

          <tbody> {/*Renderiza o restante da tabela */}
            {registros.map((registro, index) => ( /*

              'registros': é um array (documento de qualquer dado) que tem o retorno dos dados da API
              'map': é uma função do Javascript que percorre os registros feitos e pra casa registro ele 
              cria um campo na tabela
              'registro': é cada nome preenchido no formulário
              'index': é o índice de cada registro, ou seja, 
              nomeCompleto = index 0, cpf index = 1, [...]

            */
              <tr key={index} className='hover: bg-black-50 '> {/*
                key = é usado pelo react pra identificar cada linha da tabela
              
              */}
                <td className='border p-2'>{registro.nomeCompleto}</td> {/* td é a célula da tabela */}
                <td className='border p-2'>{registro.cpf}</td>
                <td className='border p-2'>{registro.data}</td>
                <td className='border p-2'>

                <div className='flex gap-4 display-flex'>
                   <button
                    type="button" onClick={() => onDelete(registro._id)}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                   ✕
                  </button> {/* Botão de excluir */}
                  <button
                    type="button" onClick={() => onEditar(registro)} 
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    ⟳
                  </button> {/* Botão de atualizar */}

                  </div>
                </td>

              </tr> //linha da tabela
            ))}
          </tbody>


        </table>

      )}

      </>
   );

}