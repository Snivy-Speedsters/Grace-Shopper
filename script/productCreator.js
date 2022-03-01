const { faker } = require('@faker-js/faker')

function createProduct(){

    const name = faker.name.findName()
    const price = faker.commerce.price(1000, 5000)
    const sku = faker.random.alphaNumeric(10)


  return{
    name,
    price,
    sku
  }
}

module.exports = createProduct
