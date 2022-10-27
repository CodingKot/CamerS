import { SOCIAL_ITEMS } from '../../const';
import {Link} from 'react-router-dom';
import Logo from '../logo/logo';
import { NAVIGATION_ITEMS } from '../../const';

function Footer (): JSX.Element {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__info">
          <Logo/>
          <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
          <ul className="social">
            {SOCIAL_ITEMS.map((item) => (
              <li className="social__item" key={`${item.value}-item`}>
                <Link className="link" to={item.path} aria-label={`Переход на страницу ${item.label}`}>
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlinkHref={`#icon-${item.value}`}></use>
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <ul className="footer__nav">
          {NAVIGATION_ITEMS.map((item) => (
            <li className="footer__nav-item" key={item.value}>
              <p className="footer__title">{item.label}</p>
              <ul className="footer__list">
                {item.content.map((element) => (
                  <li className="footer__item" key={element.value}>
                    <Link className="link" to={element.path}>{element.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
