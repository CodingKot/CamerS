import Logo from '../logo/logo';
import { NAVIGATION_ITEMS } from '../../const';
import {Link} from 'react-router-dom';
import SearchForm from './search-form/search-form';

function Header (): JSX.Element {


  return (
    <header className="header" id="header">
      <div className="container">
        <Logo/>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            {NAVIGATION_ITEMS[0].content.map((item) => (
              <li className="main-nav__item" key={item.value}>
                <Link className="main-nav__link" to={item.path}>{item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <SearchForm/>
        <a className="header__basket-link" href="/">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </a>
      </div>
    </header>
  );
}

export default Header;
