//---   Imports   ---//
const sleep = require('./modules/sleep');
const randomFromArray = require('./modules/randomFromArray');
const randomString = require('./modules/randomString');
const fs = require('fs');


async function main() {
  //---   Splash Screen   ---//
  console.log("Files will begin creation in 5s");
  await sleep(5000);

  //---   Preload Photos Into Memory   ---//
  let photos = new Array(); // Create final array containing all image data
  const resources = fs.readdirSync('./resources'); // Get all images included in the resources folder
  for (const i in resources) {
    const imageData = fs.readFileSync('./resources/'+resources[i]); // Get image data for each photo in resources
    const fileType = resources[i].split(".")[resources[i].split(".").length - 1]; // Get the file extension for each photo in resources [jpg, jpeg, png, etc.]
    photos.push({ fileType: fileType, imageData: imageData }); // Load into memory
  }
  
  //---   Begin Writing Data   ---//
  while (true) {
    const file = randomFromArray(photos); // Pick a random file for each loop
    fs.writeFileSync(`${Date.now()}_${randomString(3)}.${file.fileType}`, file.imageData); // Write file out
  }

}

main();