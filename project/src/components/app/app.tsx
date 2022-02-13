import MainScreen from '../../pages/main-screen/main-screen';

type PropsType = {
  cardsCount: number;
}

function App({cardsCount}: PropsType): JSX.Element {
  return <MainScreen cardsCount={cardsCount}/>;
}

export default App;
