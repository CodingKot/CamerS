import { useState, useEffect, ChangeEvent, useRef, KeyboardEvent } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { getSearchedCameras } from '../../../store/selectors';
import { Camera } from '../../../types/camera';
import classNames from 'classnames';
import { fetchSearchedCameras } from '../../../store/api-actions';
import { AppRoute, Query, TabControl } from '../../../const';
import { resetSearchedCameras } from '../../../store/action';


function SearchForm (): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');
  const cameras = useAppSelector(getSearchedCameras);

  const itemsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const inputRef = useRef<HTMLInputElement>(null);


  const [isFocused, setFocused] = useState(false);

  const [searchResults, setSearchResults] = useState<Camera[]>([]);


  const handleChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(target.value);
    dispatch(fetchSearchedCameras(target.value));
  };


  const handleFocus = (() => {
    setFocused(true);
  });

  const handleBlur = (() => {
    setFocused(false);
  });

  const handleSearchReset = (() => {
    setSearchValue('');
    dispatch(resetSearchedCameras());
  });

  const handleCloseOnEsc = (evt: KeyboardEvent<HTMLAnchorElement>) => {
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      handleSearchReset();
      setFocused(false);
    }
  };

  useEffect(() => {
    setSearchResults(cameras);
    itemsRef.current = itemsRef.current.slice(0, cameras.length);
  }, [searchValue, cameras]);


  return (
    <div className={classNames('form-search', {'list-opened': isFocused})} onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input className="form-search__input"
            type="text"
            ref={inputRef}
            autoComplete="off"
            placeholder="Поиск по сайту"
            onChange={handleChange}
            value={searchValue}
            onKeyDown={(evt) => {
              if(evt.key === 'ArrowDown'){
                itemsRef.current[0]?.focus();
              }
            }}

          />
        </label>
        <ul className="form-search__select-list">
          {searchResults.map((result, index) => (
            <Link key={result.id} to={{pathname: generatePath(AppRoute.Product, {id: `${result.id}`}), search: `?${Query.Tab}=${TabControl.Description}`} }
              tabIndex={0}
              ref={(el) => (itemsRef.current[index] = el)}
              onKeyDown={(evt) => {
                if(evt.key === 'ArrowDown') {
                  itemsRef.current[index + 1]?.focus();
                }
                if(evt.key === 'ArrowUp') {
                  index === 0 ? inputRef.current?.focus() : itemsRef.current[index - 1]?.focus();
                }
                handleCloseOnEsc(evt);
              }}
            >
              <li className="form-search__select-item">
                {result.name}
              </li>
            </Link>
          ))}
        </ul>
      </form>
      <button className="form-search__reset" type="reset" onClick={handleSearchReset}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default SearchForm;
