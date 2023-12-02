const fs = require('fs');

function saveToFile(content) {
    const filePath = 'vehicle.txt';
    fs.writeFileSync(filePath, content);
    console.log(`Data successfully saved to ${filePath}`);
}

module.exports = {
    saveToFile
}