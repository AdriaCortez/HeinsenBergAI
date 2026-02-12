
import { toast } from 'react-hot-toast';

export const sucesso = () => toast.success('Enviado!');
export const erro = () => toast.error('Opa! Alguma coisa deu errado [500]');
export const deletado = () => toast.success('Cadastro deletado!');

export const aviso = () => toast('O campo de nome completo é obrigatório.', {
  icon: 'ⓘ',
  duration: 2300,
}
)

export const naoexiste = () => toast.error('Esse usuário não existe ou foi deletado.');
export const jaexiste = () => toast.error('Já existe alguém com esse e-mail');
export const erro404 = () => toast.error('Página não encontrada ou rota incorreta [404]');
export const incorreto = () => toast.error('E-mail ou senha incorretos.');

export const erroderesposta = () => toast.error('Heinsenberg não está funcionando no momento.')



