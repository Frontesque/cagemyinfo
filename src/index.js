//---   Imports   ---//
const package = require('../package.json');
const sleep = require('./modules/sleep');
const randomFromArray = require('./modules/randomFromArray');
const randomString = require('./modules/randomString');
const fs = require('fs');


async function main() {
  //---   Splash Screen   ---//
  console.log("CageMyInfo - Version:", package.version)
  console.log("Starting in 5s - ctrl+c to cancel at any time");
  await sleep(5000);
  console.log("Copying...");

  //---   Preload Photos Into Memory   ---//
  let photos = new Array(); // Create final array containing all image data
  const resources = fs.readdirSync('./resources'); // Get all images included in the resources folder
  for (const i in resources) {
    const imageData = fs.readFileSync('./resources/'+resources[i]); // Get image data for each photo in resources
    const fileType = resources[i].split(".")[resources[i].split(".").length - 1]; // Get the file extension for each photo in resources [jpg, jpeg, png, etc.]
    photos.push({ fileType: fileType, imageData: imageData }); // Load into memory
  }
  
  //---   Begin Writing Data   ---//
  let diskFull = false;
  while (diskFull === false) {
    const file = randomFromArray(photos); // Pick a random file for each loop
    try {
      fs.writeFileSync(`${Date.now()}_${randomString(3)}.${file.fileType}`, file.imageData); // Write file out
    } catch (err) {
      if (err.code == 'ENOSPC') {
        diskFull == true;
        return console.log("Disk is full. Exiting.")
      }
    }
  }

}

main();