import axios from 'axios';
import {buildUrl} from "./utils/UrlBuilder";
import FileDownload from 'js-file-download';

const headers = {
    'Access-Control-Allow-Origin': '*'
};

const attachedFile = {
  h5: 'model.h5',
  json: 'model.json'
};

export const handleApi = (config, data) => {
    const url = buildUrl(config);
    axios.post(url, {
        data: data,
        train: false,
        headers: headers
    })
        .then(function (response) {
            FileDownload(response.data, attachedFile.h5);
        })
        .catch(function (error) {
            console.log(error);
        });
};