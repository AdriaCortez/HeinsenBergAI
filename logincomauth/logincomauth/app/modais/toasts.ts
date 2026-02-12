
import { toast } from 'react-hot-toast';

export const sucesso = () => toast.success('Usuário autenticado!');
export const erro = () => toast.error('Opa! Alguma coisa deu errado.');
export const deletado = () => toast.success('Cadastro deletado!');
export const naoexiste = () => toast.error('Esse usuário não existe ou foi deletado.');
export const jaexiste = () => toast.error('Já existe alguém com esse e-mail');
export const erro404 = () => toast.error('Página não encontrada ou rota incorreta [404]');
export const incorreto = () => toast.error('E-mail ou senha incorretos.');
export const senhaconfirmada = () => toast.success('Senha alterada com sucesso!');
export const senhaincorreta = () => toast.error('Senha atual incorreta.');
export const novasenhaincorreta = () => toast.error('As senhas não coincidem.');