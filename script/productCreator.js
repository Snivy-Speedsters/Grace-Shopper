const { faker } = require('@faker-js/faker')

function createProduct(index){
  const gender = faker.name.gender(true)
  const name = faker.name.findName(undefined, undefined, gender)
  const price = faker.commerce.price(1000, 5000)
  const sku = faker.random.alphaNumeric(10)
  const imageUrl = `${gender}/${index}`


  return{
    gender,
    name,
    price,
    sku,
    imageUrl
  }
}

module.exports = createProduct
