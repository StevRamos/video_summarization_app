import axios from 'axios';
import config from '@/config';

export const summarizeVideo = async (video) => {
    const url = `${config.api}/summarize-video`;
    const formData = new FormData();

//    for(var i=0; i<videos.length; i++){
//        formData.append('videos', videos[i]);
//    }
    formData.append('video', video);    

    return await axios.post(url, formData, {headers: {'Content-Type': 'multipart/form-data'}});
}


export const getSpotlight = async (filePath) => {
    const url = `${config.api}/get-spotlight`;
    return await axios.get(`${url}?video_name=${filePath}`,
                        {responseType: 'blob'})
}
