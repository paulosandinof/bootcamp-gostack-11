"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/providers/CacheProvider/fakes/FakeCacheProvider"));

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeCacheProvider;
let listProviders;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviders = new _ListProvidersService.default(fakeUsersRepository, fakeCacheProvider);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456'
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456'
    });
    const providers = await listProviders.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
  it('Should be able to load providers from cache', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'LoggedUser',
      email: 'loggeduser@gmail.com',
      password: '123123'
    });
    const provider1 = await fakeUsersRepository.create({
      name: 'Provider1',
      email: 'provider1@gmail.com',
      password: '123123'
    });
    const provider2 = await fakeUsersRepository.create({
      name: 'Provider2',
      email: 'provider2@gmail.com',
      password: '123123'
    });
    await fakeCacheProvider.save(`providers-list:${loggedUser.id}`, [provider1, provider2]);
    const providers = await listProviders.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([provider1, provider2]);
  });
});