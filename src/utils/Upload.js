export const getFileData = (evt, handler) => {
    let files = evt.target.files;
    let f = files[0];
    let reader = new FileReader();
    reader.onload = (function () {
        return function (e) {
            try {
                let json = JSON.parse(e.target.result);
                handler(json);
            } catch (ex) {
                console.log(ex);
            }
        }
    })(f);
    if (f) {
        reader.readAsText(f);
    }
};
