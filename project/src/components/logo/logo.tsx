import { memo } from 'react';
import { Link } from 'react-router-dom';

type LogoProps = {
  isMain: boolean;
}

function Logo({isMain}: LogoProps): JSX.Element {
  const className = `header__logo-link${isMain ? isMain && '--active' : ''}`;

  return (
    <Link className={className}  to="/">
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
    </Link>
  );
}

export default memo(Logo);
