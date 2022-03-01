const puppeteer = require('puppeteer')

// This function takes the total amount of images you want as an arguement
const grabImage = async (numberOfImages = 1) => {
  const images = []

  // inits puppeteer
  const browser = await puppeteer.launch({headless: true})
  const page = await browser.newPage()

  // Simple loop to refresh the page and grab a new image until the length of
  // the images array matches the desired number
  while(images.length != numberOfImages){
    await page.goto('https://this-person-does-not-exist.com/en')

    const data = await page.evaluate(() => {

      // should try to optimize
      const docImages = document.querySelectorAll('img')
      const urls = Array.from(docImages).map(img => img.src)
      return urls[41]
    })
    images.push(data)
  }

  // closes browser and returns all images AFTER the promises have been resolved
  await browser.close()
  return Promise.all(images)
}

module.exports = grabImage
