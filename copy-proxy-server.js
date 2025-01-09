const fs = require('fs');
const path = require('path');

const sourcePath = 'src/proxy-server.mjs';
const destinationPath = 'dist/loom21website/proxy-server.mjs';

// Check if the source file exists
if (fs.existsSync(sourcePath)) {
    // Get the absolute paths of the source and destination files
    const sourceAbsolutePath = path.resolve(sourcePath);
    const destinationAbsolutePath = path.resolve(destinationPath);

    // Copy the source file to the destination
    fs.copyFile(sourceAbsolutePath, destinationAbsolutePath, (err) => {
        if (err) {
            console.error('Error copying the file:', err);
        } else {
            console.log('File copied successfully.');
        }
    });
} else {
    console.error('The source file does not exist.');
}


const sourcePathSitemap = 'src/sitemap.xml';
const destinationPathSitemap = 'dist/loom21website/sitemap.xml';

// Check if the source file exists
if (fs.existsSync(sourcePath)) {
    // Get the absolute paths of the source and destination files
    const sourceAbsolutePath = path.resolve(sourcePathSitemap);
    const destinationAbsolutePath = path.resolve(destinationPathSitemap);

    // Copy the source file to the destination
    fs.copyFile(sourceAbsolutePath, destinationAbsolutePath, (err) => {
        if (err) {
            console.error('Error copying the file sitemap.xml:', err);
        } else {
            console.log('File sitemap.xml copied successfully.');
        }
    });
} else {
    console.error('The sitemap.xml file does not exist.');
}

const sourcePathRobots = 'src/robots.txt';
const destinationRobots = 'dist/loom21website/robots.txt';

// Check if the source file exists
if (fs.existsSync(sourcePath)) {
    // Get the absolute paths of the source and destination files
    const sourceAbsolutePath = path.resolve(sourcePathRobots);
    const destinationAbsolutePath = path.resolve(destinationRobots);

    // Copy the source file to the destination
    fs.copyFile(sourceAbsolutePath, destinationAbsolutePath, (err) => {
        if (err) {
            console.error('Error copying the file robots.txt:', err);
        } else {
            console.log('File robots.txt copied successfully.');
        }
    });
} else {
    console.error('The robots.txt file does not exist.');
}
