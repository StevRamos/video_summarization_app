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

export const getSpotlight = async (video_id, summary_id, proportion) => {
    const url = `${config.api}/get-spotlight`;
    return await axios.get(`${url}?video_id=${video_id}&summary_id=${summary_id}&proportion=${proportion}`)
}

export const downloadSpotlight = async (spotlight_id) => {
    const url = `${config.api}/download-spotlight`;
    return await axios.get(`${url}?spotlight_id=${spotlight_id}`,
                        {responseType: 'blob'})
}
