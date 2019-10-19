import axios from 'axios';
import {buildUrl} from "./utils/UrlBuilder";

export const handleApi = (config, data) => {
    const url = buildUrl(config);
    console.log(data);
    axios.post(url, {
        model: data
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};