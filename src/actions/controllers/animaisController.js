import {AxiosInstance} from '../util';

export const listarAnimais = async() => {
    return AxiosInstance.get("/api/Animal/ListarAnimais")
        .then((resp) => {
            return resp.data.body
        })
}

export const listarRacas = async () => {
    return AxiosInstance.get("/api/Animal/ListarRacas")
        .then((resp) => {
            return resp.data.body
        })
}

export const listarEspecies = async () => {
    return AxiosInstance.get("/api/Animal/ListarEspecies")
        .then((resp) => {
            return resp.data.body
        })
}

export const cadastrarAnimais = async (dto) => {
    return AxiosInstance.post("/api/Animal/CadastrarAnimais", dto)
    .then((resp) => {
       return resp.data        
    })
}

export const cadastrarEspecies = async (dto) => {
    return AxiosInstance.post("/api/Animal/CadastrarEspecie", dto)
    .then((resp) => {
       return resp.data        
    })
}

export const cadastrarRacas = async (dto) => {
    return AxiosInstance.post("/api/Animal/CadastrarRaca", dto)
    .then((resp) => {
       return resp.data        
    })
}

export const recuperarAnimalPorId = async (id) => {
    return AxiosInstance.get(`/api/Animal/BuscarAnimal/${id}`)
    .then((resp) => {
       return resp.data.body        
    })
} 

export const editarAnimais = async (dto) => {
    return AxiosInstance.post("/api/Animal/EditarAnimal", dto)
    .then((resp) => {
       return resp.data        
    })
}

export const recuperarEspeciePorId = async (id) => {
    return AxiosInstance.get(`/api/Animal/BuscarEspecie/${id}`)
    .then((resp) => {
       return resp.data.body     
    })
} 

export const editarEspecies = async (dto) => {
    return AxiosInstance.post("/api/Animal/EditarEspecie", dto)
    .then((resp) => {
       return resp.data        
    })
}

export const recuperarRacaPorId = async (id) => {
    return AxiosInstance.get(`/api/Animal/BuscarRaca/${id}`)
    .then((resp) => {
       return resp.data.body
    })
}

export const editarRaca = async (dto) => {
    return AxiosInstance.post("/api/Animal/EditarRaca", dto)
    .then((resp) => {
       return resp.data        
    })
}

