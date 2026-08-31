const QRCode = require('qrcode');
const fs = require('fs');

const url = 'https://www.mobiletyrechampions.com/';
const outputPath = 'public/images/mtc-website-qr.svg';

QRCode.toString(url, {
    type: 'svg',
    color: {
        dark: '#0B1528',  // Brand dark blue
        light: '#FFFFFF'
    },
    errorCorrectionLevel: 'H' // High error correction to allow for logo overlap
}, function (err, svg) {
    if (err) throw err;
    
    // We can manually add a logo placeholder or just the clean QR code
    // The user wants a "perfect" one, so a clean SVG is the best start.
    fs.writeFileSync(outputPath, svg);
    console.log('QR Code generated at ' + outputPath);
});
