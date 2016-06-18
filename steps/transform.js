const inDir = 'state/get/';
const outDir = 'state/transform/';

const fs = require('fs');
const cheerio = require('cheerio');
const config = require('../config.json');

var getLanguage = function (fileName) {
    return fileName.split('_').pop().split('.')[0];
};


const filesByLanguage = fs.readdirSync(inDir).filter(fileName => fileName.split('.').pop() === 'html').
    reduce(function (acc, fileName) {
        var language = config.languageMapping[getLanguage(fileName)] || 'Misc';
        acc[language] = acc[language] || [];

        var html = fs.readFileSync(inDir + fileName, 'utf8');
        var $ = cheerio.load(html);
        var title = ($('meta[property="og:title"]').attr('content') || '').replace(/[^A-z0-9 \-\.]/g, '');

        acc[language].push({
            displayName: title || fileName.split('_').slice(0, -1).join(' ').replace(/[^A-z]/g, ' '),
            url: fileName,
            image: fileName.split('_')[0] + '-128.png'
        });
        return acc;
    }, {});

fs.writeFileSync(outDir + 'catalog.json', JSON.stringify({ filesByLanguage }), 'utf8');