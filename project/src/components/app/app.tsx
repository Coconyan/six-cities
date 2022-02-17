import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import RoomScreen from '../../pages/room-screen/room-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';

type PropsType = {
  cardsCount: number;
}

function App({cardsCount}: PropsType): JSX.Element {
  // return <MainScreen cardsCount={cardsCount}/>;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainScreen cardsCount={cardsCount} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={<FavoritesScreen />}
        />
        <Route
          path={AppRoute.Room}
          element={<RoomScreen  />}
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignInScreen  />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
