import { Link } from 'react-router-dom';
import {
  AppRoute,
  AuthorizationStatus
} from '../../const';
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';
import { getEmail } from '../../services/token';
import { logoutAction } from '../../store/api-actions';

function HeaderLoginInfo(): JSX.Element {
  const {authorizationStatus} = useAppSelector((state) => state);
  const email = getEmail();
  const dispatch = useAppDispatch();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{email}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link
            to={AppRoute.Root}
            className="header__nav-link"
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(logoutAction());
            }}
          >
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    );
  }
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.SignIn}>
          <div className="header__avatar-wrapper user__avatar-wrapper" />
          <span className="header__login">Sign in</span>
        </Link>
      </li>
    </ul>
  );
}

export default HeaderLoginInfo;
