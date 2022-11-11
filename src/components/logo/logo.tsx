import {Link} from 'react-router-dom';
import { AppRoute } from '../../const';

function Logo ():JSX.Element {
  return (
    <Link className="header__logo" to={AppRoute.Home} aria-label="Переход на главную" data-testid="logo">
      <svg width="100" height="36" aria-hidden="true">
        <use xlinkHref="#icon-logo"></use>
      </svg>
    </Link>
  );
}

export default Logo;
