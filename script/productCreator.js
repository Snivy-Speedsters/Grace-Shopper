const { faker } = require('@faker-js/faker')

function createProduct(index){
  const gender = faker.name.gender(true).toLowerCase()
  const name = faker.name.findName(undefined, undefined, gender === 'male' ? 0 : 1)
  const price = faker.commerce.price(1000, 5000)
  const sku = faker.random.alphaNumeric(10)
  const imageUrl = `/images/${gender}/${gender}${index}.jpg`


  return{
    name,
    price,
    sku,
    imageUrl
  }
}

module.exports = createProduct
