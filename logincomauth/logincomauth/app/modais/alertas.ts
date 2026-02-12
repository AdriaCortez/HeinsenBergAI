
import Swal from "sweetalert2";


export const ConfirmarDelete = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  }
});


export const ConfirmarAviso = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success"
  }
});


export async function aviso() {

  const Alterado = await ConfirmarAviso.fire({  
    title: 'Senha alterada com sucesso!',
     icon: 'success',
    confirmButtonText: 'Ok, entendi!'
  })

  return Alterado.isConfirmed
}


export async function simDeletar (nome: string) {

const confirmar = await ConfirmarDelete.fire({
  title: `Você quer realmente deletar sua conta?`, //entre crase para que o ts reconheça o nome
  text: "Essa ação não poderá ser desfeita!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Sim, deletar",
  cancelButtonText: "Cancelar",
  reverseButtons: true
})

return confirmar.isConfirmed

}

