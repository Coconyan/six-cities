import { Link } from 'react-router-dom';

type LogoProps = {
  isMain: boolean;
}

function Logo({isMain}: LogoProps): JSX.Element {
  let className = 'header__logo-link';
  if (isMain) {
    className += 'header__logo-link--active';
  }

  return (
    <Link className={className}  to="/">
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
    </Link>
  );
}

export default Logo;
