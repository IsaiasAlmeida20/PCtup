export type PostType = {
  id: string,
  usuarioId: string,
  descricao: string,
  estaAtivo: boolean,
  estaPublico: boolean,
  imagens: [
    {
      id: string,
      url: string
    }
  ],
  createdAt: string,
  updatedAt: string,
  titulo: string,
  usuario: {
    id: string,
    nome: string,
    email: string,
    cargo: string,
    createdAt: string,
    updatedAt: string,
    dataNascimento: Date,
    cidade: string,
    estado: string,
    profissao: string
  }
}