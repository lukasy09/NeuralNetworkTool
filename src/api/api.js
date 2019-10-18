export const handleSendModel = (config, url) => {
    const model = config.model;
    axios.post(url, {
        model: model
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};