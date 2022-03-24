import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { checkAuthAction, fetchCurrentOffer, fetchCurrentOffersComments, fetchCurrentOffersNearby, fetchOffersAction, getFavoriteOffers, loginAction, logoutAction } from './api-actions';
import { requireAuthorization } from './user-process/user-process';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { AuthData } from '../types/auth-data';
import { makeFakeOffer } from '../mocks/fake-offer';
import { loadCurrentOffer, loadCurrentOffersComments, loadCurrentOffersNearby, loadFavoriteOffers, loadOffers } from './data/data';
import { makeFakeComment } from '../mocks/fake-comment';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toContain(requireAuthorization.toString());
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });

  it('should dispatch Load Offers when GET /hotels', async () => {
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadOffers.toString());
  });

  it('should dispatch Load Offer when GET /hotels/id', async () => {
    const mockOffer = makeFakeOffer();
    mockAPI
      .onGet(`${APIRoute.Offers}/1`)
      .reply(200, mockOffer);

    const store = mockStore();

    await store.dispatch(fetchCurrentOffer(1));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadCurrentOffer.toString());
  });

  it('should dispatch Load Offers when GET /hotels/id/nearby', async () => {
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];
    mockAPI
      .onGet(`${APIRoute.Offers}/1/nearby`)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchCurrentOffersNearby(1));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadCurrentOffersNearby.toString());
  });

  it('should dispatch Load Offer comments when GET /hotels/id', async () => {
    const mockComments = [makeFakeComment(), makeFakeComment()];
    mockAPI
      .onGet(`${APIRoute.Comments}/1`)
      .reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(fetchCurrentOffersComments(1));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadCurrentOffersComments.toString());
  });

  it('should dispatch Load favorite Offers when GET /favorite', async () => {
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(getFavoriteOffers());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadFavoriteOffers.toString());
  });

  it('should dispatch fetchOffersAction when POST /favorite', async () => {
    mockAPI
      .onPost(`${APIRoute.Favorite}/1/1`)
      .reply(200);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadOffers.toString());
  });

  it('should dispatch getFavoriteOffers when POST /favorite', async () => {
    mockAPI
      .onPost(`${APIRoute.Favorite}/1/1`)
      .reply(200);

    const store = mockStore();

    await store.dispatch(getFavoriteOffers());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadFavoriteOffers.toString());
  });

  it('should dispatch fetchCurrentOffer when POST /favorite', async () => {
    mockAPI
      .onPost(`${APIRoute.Favorite}/1/1`)
      .reply(200);

    const store = mockStore();

    await store.dispatch(fetchCurrentOffer(1));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadCurrentOffer.toString());
  });

  it('should dispatch fetchOffersAction when POST /favorite/0', async () => {
    mockAPI
      .onPost(`${APIRoute.Favorite}/1/0`)
      .reply(200);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadOffers.toString());
  });

  it('should dispatch getFavoriteOffers when POST /favorite/0', async () => {
    mockAPI
      .onPost(`${APIRoute.Favorite}/1/0`)
      .reply(200);

    const store = mockStore();

    await store.dispatch(getFavoriteOffers());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadFavoriteOffers.toString());
  });

  it('should dispatch fetchCurrentOffer when POST /favorite/0', async () => {
    mockAPI
      .onPost(`${APIRoute.Favorite}/1/0`)
      .reply(200);


    const store = mockStore();

    await store.dispatch(fetchCurrentOffer(1));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadCurrentOffer.toString());
  });
});


