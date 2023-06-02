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
      imagem: {
        publicId: string,
        url: string
      },
    }
}

export type UserType = {
  nome: string,
  email: string,
  cargo: string,
  profissao: string,
  dataNascimento: string,
  estado: string,
  cidade: string,
  imagem: {
      publicId: string,
      url: string
  },
  createdAt: string,
  id: string
}