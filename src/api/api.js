import axios from 'axios';

export const httprequest = (url) =>{
    return new Promise((resolve, reject) => {
        axios.post(url).then((response) => {
            resolve(response.data.datas)
        })
    })
}