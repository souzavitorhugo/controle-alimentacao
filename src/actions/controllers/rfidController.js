import {AxiosInstance} from '../util';

export const listarRFID = async () => {
    return AxiosInstance.get("/api/RFID/ListarRfids")
    .then((resp) => {
        return resp.data.body
    })
}