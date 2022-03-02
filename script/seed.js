'use strict'

const {db, models: {User, Product} } = require('../server/db')
const createUser = require('./userCreator')
const createProduct = require('./productCreator')

// Change number to the desired amount of users and products to be generated
const userAmount = 20
const productAmount = 20
const productIds = []

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  for(let i = 0; i < userAmount; i++){
    await User.create(createUser())
  }

  for(let i = 0; i < productAmount; i++){
    await Product.create(createProduct(i + 1))

    if((Math.floor(Math.random() * 10)) < 5){
      productIds.push(i + 1)
    } else if(i === 0){
      productIds.push(i + 1)
    }
  }

  for(let i = 0; i < productIds.length; i++){
    const user = await User.findByPk(((Math.floor(Math.random() * productAmount) + 1)))
    await user.addProduct(productIds[i + 1])
  }

  await User.create({firstName: 'John', lastName: 'Doe', email: 'test@email.com', password: '123', address: '123 Road Lane'})

  await User.create({firstName: 'Jane', lastName: 'Doe', email: 'testAdmin@email.com', password: '123', address: '456 Lane Road', administrator: true})

  console.log(`seeded successfully`)
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
