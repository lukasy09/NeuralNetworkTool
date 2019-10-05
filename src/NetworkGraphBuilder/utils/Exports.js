export const EXPORTS_TYPES = {
    PNG: 'png',
    JPEG: 'jpeg',
    JSON: 'json'
};

/**
 * Exporter superclass. Exports of different format types are implmeneted using composition.
 */

export class GraphExporter {

    name = "graph";
    type = 'text/*';

    constructor(exporter) {
        if (!exporter) {
            this.formatExporter = exporter;
        }
    }

    setExporter(formatType) {
        switch (formatType) {
            case EXPORTS_TYPES.PNG:
                this.formatExporter = new PNGExporter();
                break;
            case EXPORTS_TYPES.JPEG:
                this.formatExporter = new JPGExporter();
                break;
            case EXPORTS_TYPES.JSON:
                this.formatExporter = new JSONExporter();
                break;
            default:
                console.log("Wrong export type! Contact the application's developer")
        }
        return this.formatExporter;
    }

    downloadData(appendData) {
        let a = document.createElement('a');
        let file = new Blob([appendData], {type: this.type});
        a.href = URL.createObjectURL(file);
        a.download = this.name;
        a.click();
    }

    export(cy) {
        this.formatExporter.export(cy);
    }
}

class PNGExporter extends GraphExporter {

    type = "image/png";
    name = `${this.name}.png`;

    export(cy) {
        let exportData = cy.png();
        this.downloadData(exportData);
    }
}


class JPGExporter extends GraphExporter {

    type = "image/jpg";
    name = `${this.name}.jpg`;

    export(cy) {
        let exportData = cy.jpg();
        this.downloadData(exportData);
    }
}


class JSONExporter extends GraphExporter {

    type = "application/json";
    name = `${this.name}.json`;

    export(cy) {
        let exportData = JSON.stringify(cy.json(), null, 2);
        this.downloadData(exportData);
    }
}
