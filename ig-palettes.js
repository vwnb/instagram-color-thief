'use strict';

const ColorThief = require('color-thief');
const fs = require('fs');


// ~~~~~ Helpers ~~~~~ //

let arrayOfObjectsToCsv = (inputArr) => {
    let headerStr = Object.keys(inputArr[0]).join(",") + '\r\n';

    return headerStr + inputArr.map((row) => {
        return Object.values(row).join(',');
    }).join('\r\n');
}

let rgbToHex = (rgb) => {
    let hex = Number(rgb).toString(16);

    if (hex.length < 2) {
         hex = '0' + hex;
    }

    return hex;
};


// ~~~~~ Read arguments ~~~~~ //

let argumentMap     = require('minimist')(process.argv.slice(2));
let outputFormat    = argumentMap.format ? argumentMap.format : 'CSV';
let includeDates    = argumentMap.dates === 'false' ? false : true;
let includeCaptions = argumentMap.captions === 'false' ? false : true;
let colorCount      = argumentMap.colorCount ? argumentMap.colorCount : 5;


// ~~~~~ Initialisation ~~~~~ //

let colorThief = new ColorThief();
let mediaFile  = fs.readFileSync(__dirname + '/userdata/media.json');
let media      = JSON.parse(mediaFile);
media.photos = media.photos.sort((a, b) => {
    return (a.taken_at < b.taken_at) ? -1 : ((a.taken_at > b.taken_at) ? 1 : 0);
});

let outputRows = [];

for (let [key, photo] of Object.entries(media.photos)) {

    let photoPath = __dirname + '/userdata/' + photo.path;

    if (!fs.existsSync(photoPath)) {
        continue;
    }


    // ~~~~~ Build row ~~~~~ //

    let row = {};

    if (includeDates) {
        row['date'] = photo.taken_at;
    }

    if (includeCaptions) {
        row['caption'] = photo.caption;
    }

    let palette    = colorThief.getPalette(photoPath, colorCount);
    for (let [key, color] of palette.entries()) {
        row['color_' + (key + 1)] = '#' + color.map((rgb) => {
            return rgbToHex(rgb);
        }).join('');
    }

    outputRows.push(row);
}



// ~~~~~ Output ~~~~~ //

if (outputFormat === 'CSV') {
    fs.writeFileSync('csv-output.csv', arrayOfObjectsToCsv(outputRows));
} else if (outputFormat === 'JSON') {
    fs.writeFileSync('json-output.json', JSON.stringify(outputRows));
}
