export const handleUpload = (evt) => {
    let files = evt.target.files;
    for (let i = 0, f; f = files[i]; i++) {
        let reader = new FileReader();
        reader.onload = (function () {
            return function (e) {
                try {
                    let json = JSON.parse(e.target.result);
                    console.log(json);
                    return json;
                } catch (ex) {
                    console.log(ex);
                }
            }
        })(f);
        reader.readAsText(f);
    }
};