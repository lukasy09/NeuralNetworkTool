import {buildUrl} from "./utils/UrlBuilder";
import axios from 'axios';

const headers = {
    'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
};

export const handleApi= (config, data) => {
    const url = buildUrl(config);
    axios.get(url, {
        'origin': '*',
        'Access-Control-Allow-Origin': 'http://127.0.0.1:8000/train',
        'Access-Control-Allow-Methods':'GET'
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};