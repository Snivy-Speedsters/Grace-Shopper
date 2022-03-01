const { faker } = require('@faker-js/faker')

function createUser(){

    const firstName = faker.name.firstName()
    const lastName = faker.name.lastName()
    const email = faker.internet.email(firstName, lastName)
    const password = faker.internet.password(10)
    const shippingAddress = faker.address.streetName()


  return{
    firstName,
    lastName,
    email,
    password,
    shippingAddress
  }
}

module.exports = createUser
