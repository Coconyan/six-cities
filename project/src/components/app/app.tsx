import {
  Route,
  BrowserRouter,
  Routes
} from 'react-router-dom';
import {
  AppRoute,
  AuthorizationStatus
} from '../../const';
import { Offer } from '../../types/offer';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import RoomPage from '../../pages/room-page/room-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';

type PropsType = {
  offers: Offer[];
}

function App({offers}: PropsType): JSX.Element {
  const {currentCity} = useAppSelector((state) => state);
  const currentCityOffers = offers.filter((offer) => offer.city.name === currentCity.name);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainPage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Room}
          element={<RoomPage offers={currentCityOffers}/>}
        >
          <Route path={`${AppRoute.Room}:id`} element={<RoomPage offers={currentCityOffers}/>} />
        </Route>
        <Route
          path={AppRoute.SignIn}
          element={<SignInPage  />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
