import {
  Route,
  BrowserRouter,
  Routes
} from 'react-router-dom';
import {
  AppRoute,
  SPINNER_COLOR
} from '../../const';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import MainPage from '../../pages/main-page/main-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import RoomPage from '../../pages/room-page/room-page';
import SignInPage from '../../pages/sign-in-page/sign-in-page';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import { SpinnerCircular } from 'spinners-react';

function App(): JSX.Element {
  const {currentCity, offers, authorizationStatus, isDataLoaded} = useAppSelector((state) => state);
  const currentCityOffers = offers.filter((offer) => offer.city.name === currentCity.name);

  if (!isDataLoaded) {
    return (
      <SpinnerCircular color={SPINNER_COLOR}/>
    );
  }

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
            <PrivateRoute authorizationStatus={authorizationStatus}>
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
