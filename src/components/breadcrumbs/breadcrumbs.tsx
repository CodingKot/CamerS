import { Link, useLocation } from 'react-router-dom';
import { changeBreadcrumbs, getBreadcrumbsPath } from '../../utils/utils';
import {HOME_URL_LENGTH} from '../../const';

type BreadcrumpsProps = {
  title?: string;
}

function Breadcrumbs ({title}: BreadcrumpsProps): JSX.Element {
  const {pathname} = useLocation();

  let links = [];
  if(pathname.length > HOME_URL_LENGTH) {
    links = pathname.split('/');
    links.splice(0,1, 'home');
  } else {
    links = ['home'];
  }

  return (
    <div className="breadcrumbs" data-testid="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list" >
          {links.map((link, index) => {
            const isLast = index === links.length - 1;
            const linkName = changeBreadcrumbs(link, title);
            return (
              <li className="breadcrumbs__item" key={link}>
                {isLast ?
                  <span className="breadcrumbs__link breadcrumbs__link--active">{linkName}
                  </span>
                  :
                  <Link className="breadcrumbs__link" to={getBreadcrumbsPath(link)}>{linkName}
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </Link>}
              </li>
            );
          }
          )}
        </ul>
      </div>
    </div>
  );
}

export default Breadcrumbs;
