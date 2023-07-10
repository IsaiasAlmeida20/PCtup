export type PostType = {
    _id: string,
    usuarioId: string,
    descricao: string,
    estaAtivo: boolean,
    estaPublico: boolean,
    favorited?: boolean
    imagens: [
      {
        publicId: string,
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
  email?: string,
  cargo?: string,
  profissao: string,
  dataNascimento: string,
  estado: string,
  cidade: string,
  imagem: {
      publicId: string,
      url: string
  },
  createdAt?: string,
  id?: string
}

export type CommentType = {
  _id: string,
  usuarioId: string,
  setupId: string,
  descricao: string,
  createdAt: string,
  updatedAt: string,
  usuario: {
    _id: string,
    nome: string,
    email: string,
    dataNascimento: string,
    profissao: string,
    estado: string,
    cidade: string,
    cargo: string,
    imagem: {
      publicId: string,
      url: string
    },
    createdAt: string,
    updatedAt: string
  }
}

export type FavoriteType = {
  _id: string,
  usuarioId: string,
  setupId: string,
  createdAt: string,
  setup: {
    _id: string,
    usuarioId: string,
    titulo: string,
    descricao: string,
    estaAtivo: boolean,
    estaPublico: boolean,
    imagens: [
      {
        publicId: string,
        url: string
      }
    ],
    createdAt: string,
    updatedAt: string,
    usuario: {
      _id: string,
      nome: string,
      email: string,
      dataNascimento: string,
      profissao: string,
      estado: string,
      cidade: string,
      cargo: string,
      imagem: {
        publicId: string,
        url: string
      },
      createdAt: string,
      updatedAt: string
    }
  }
}

export type LikeType = {
  _id: string,
  usuarioId: string,
  setupId: string,
  createdAt: string
}

export type SetupDescription = {
  usuarioId?: string | null
  titulo: string
  descricao: string
  estaPublico?: boolean
}

export type SetupEdit = {
  _id: string,
  usuarioId: string,
  titulo: string,
  descricao: string,
  estaAtivo: true,
  estaPublico: true,
  imagens: [
    {
      publicId: string,
      url: string
    }
  ],
  createdAt: string,
  updatedAt: string
}