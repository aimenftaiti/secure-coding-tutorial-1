import * as chai from 'chai'
import { assert, expect } from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { User } from '../../entities/user'
import { AppDataSource, getInitializedAppDataSource } from '../../lib/typeorm'
import { DataSource } from 'typeorm'
import { Session } from '../../entities/session'
//import { QueryFailedError } from 'typeorm'

chai.use(chaiAsPromised)

describe('User', function () {

  let dataSource: DataSource;

  before(async function () {
    dataSource = await getInitializedAppDataSource();
  })

  beforeEach(async function () {
    await dataSource.getRepository(User).delete({})
  })

  // function to create a user repository
  const createUserRepository = () => {
    return dataSource.getRepository(User)
  }

  // function to create a user
  const createUser = async (firstname: string, lastname: string, email: string) => {
    // create a user repository
    const user = new User(firstname, lastname, email)
    return await createUserRepository().save(user)
  }

  describe('validations', function () {
    it('should create a new User in database', async function () {
      const user = await createUser('John', 'Doe', 'john@doe.com')

      const userTest = await createUserRepository().findOneBy({
        firstname: "John"
      });

      assert(userTest?.id === user.id);
    })

    it('should raise error if email is missing', async function () {
      const user = new User("Timbe", "Saw")
      await chai.expect((async () => {
        const userRepository = dataSource.getRepository(User)
        await userRepository.save(user)
      })()).to.eventually.be.rejected.and.deep.include({
        target: user,
        property: 'email',
        constraints: { isNotEmpty: 'email should not be empty' }
      })
    })

    // Exercice 5
    /*it('should raise error if email is not unique', async function () {
      await createUser('John', 'Doe', 'john@doe.com')
      const promise = createUser('John2', 'Doe2', 'JOHN@doe.com')
      await expect(promise).to.eventually.be.rejectedWith(QueryFailedError, /duplicate key value violates unique constraint/)
    })*/

    // Exercice 6
    it('should raise error if email is not unique', async function () {
      await createUser('John', 'Doe', 'john@doe.com')
      const user2 = new User('John2', 'Doe2', 'john@doe.com')
      const promise = createUser(user2.firstname, user2.lastname, user2.email)
      await expect(promise).to.eventually.be.rejected.and.deep.include({
        target: user2,
        property: 'email',
        constraints: { UniqueInColumnConstraint: "Email already exists" }
      })
    })

    it('should raise error if password and password confirmation do not match', async function () {
      const user = new User('John', 'Doe', 'john@doe.com')
      await expect(user.setPassword("password", "password_"))
        .to.be.rejectedWith(Error, "Password and password confirmation do not match")
    })

    it('should raise error if password is not strong enough', async function () {
      const user = new User('John', 'Doe', 'john@doe.com')
      await expect(user.setPassword("password", "password"))
        .to.be.rejectedWith(Error, "Password is not strong enough")
    })

  })
})
