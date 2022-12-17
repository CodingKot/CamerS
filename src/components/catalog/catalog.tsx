import { getPromo, getCamerasPerPage, getIsDataLoading} from '../../store/selectors';
import Banner from '../banner/banner';
import CatalogAside from './catalog-aside/catalog-aside';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import { useAppSelector, useAppDispatch } from '../../hooks/index';
import CatalogContent from './catalog-content/catalog-content';
import { fetchPromo, fetchCameras, fetchMinPrice, fetchMaxPrice } from '../../store/api-actions';
import { useEffect, useMemo, useState, ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Query, SortParameter, CAMERAS_PER_PAGE, OrderParameter, FILTER_QUERIES, PAGES_START } from '../../const';
import { unwrapResult } from '@reduxjs/toolkit';


function Catalog (): JSX.Element {

  const dispatch = useAppDispatch();

  const banner = useAppSelector(getPromo);

  const isDataLoading = useAppSelector(getIsDataLoading);

  const [searchParams, setSearchParams] = useSearchParams();

  const [minPricePlaceholder, setMinPricePlaceholder] = useState('');
  const [maxPricePlaceholder, setMaxPricePlaceholder] = useState('');


  const currentPage = Number(searchParams.get(Query.PageNumber));

  const sortingParams = useMemo(() => ({
    sortType: searchParams.get(Query.SelectedSortingType),
    order: searchParams.get(Query.SelectedOrderType),

  }), [searchParams]);

  const filterParams = useMemo(() => ({
    minPrice: searchParams.get(Query.PriceMin),
    maxPrice: searchParams.get(Query.PriceMax),
    category: searchParams.getAll(Query.Category),
    type: searchParams.getAll(Query.Type),
    level: searchParams.getAll(Query.Level),
  }), [searchParams]);

  const [minPrice, setMinPrice] = useState(filterParams.minPrice);
  const [maxPrice, setMaxPrice] = useState(filterParams.maxPrice);

  const offset = (currentPage - 1) * CAMERAS_PER_PAGE;

  const cameras = useAppSelector(getCamerasPerPage).slice(offset, offset + CAMERAS_PER_PAGE);


  const changeSortingSearchParams = (sortingType: string) => {
    if (!sortingParams.order) {
      searchParams.set(Query.SelectedSortingType, sortingType);
      searchParams.set(Query.SelectedOrderType, OrderParameter.Up);
      setSearchParams(searchParams);
    } else {
      searchParams.set(Query.SelectedSortingType, sortingType);
      setSearchParams(searchParams);
    }
  };

  const changeOrderSearchParams = (orderType: string) => {
    if(!sortingParams.sortType) {
      searchParams.set(Query.SelectedSortingType, SortParameter.Price);
      searchParams.set(Query.SelectedOrderType, orderType);
      setSearchParams(searchParams);
    } else {
      searchParams.set(Query.SelectedOrderType, orderType);
      setSearchParams(searchParams);
    }
  };

  const generateQueryParams = (page: number) => {
    const newSearch = new URLSearchParams(searchParams);
    newSearch.set(Query.PageNumber, page.toString());
    return newSearch.toString();
  };

  const handleMinPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setMinPrice(evt.target.value);
  };

  const handleMaxPriceChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(evt.target.value);
  };


  const checkMinPrice = async () => {
    if(!minPrice){
      searchParams.delete(Query.PriceMin);
      setSearchParams(searchParams);
      return;
    }
    if(Number(minPrice) < Number(minPricePlaceholder) || Number(minPrice) > Number(maxPricePlaceholder)) {
      searchParams.set(Query.PriceMin, minPricePlaceholder);
      searchParams.set(Query.PageNumber, PAGES_START.toString());
      setSearchParams(searchParams);
      return;
    }
    if(maxPrice && Number(minPrice) > Number(maxPrice)) {
      searchParams.set(Query.PriceMin, maxPrice);
    } else {
      await dispatch(fetchMinPrice(Number(minPrice)))
        .then(unwrapResult)
        .then((result: string) => {
          searchParams.set(Query.PriceMin, result);
        })
        .catch((err) => searchParams.set(Query.PriceMax, minPricePlaceholder));
    }
    searchParams.set(Query.PageNumber, PAGES_START.toString());
    setSearchParams(searchParams);
  };


  const checkMaxPrice = async () => {
    if(!maxPrice) {
      searchParams.delete(Query.PriceMax);
      setSearchParams(searchParams);
      return;
    }

    if(Number(maxPrice) > Number(maxPricePlaceholder) || Number(maxPrice) < Number(minPricePlaceholder)) {
      searchParams.set(Query.PriceMax, maxPricePlaceholder);
      searchParams.set(Query.PageNumber, PAGES_START.toString());
      setSearchParams(searchParams);
      return;
    }
    if(minPrice && Number(maxPrice) < Number(minPrice)) {
      searchParams.set(Query.PriceMax, minPrice);
    } else {
      await dispatch(fetchMaxPrice(Number(maxPrice)))
        .then(unwrapResult)
        .then((result: string) => {
          searchParams.set(Query.PriceMax, result);
        })
        .catch((err) => searchParams.set(Query.PriceMax, maxPricePlaceholder));
    }
    searchParams.set(Query.PageNumber, PAGES_START.toString());
    setSearchParams(searchParams);
  };

  const handleFilterParamsChange = (value: string, queries: string[], name: Query) => {
    if(queries.includes(value)) {
      searchParams.delete(name);
      const newQueries = queries.filter((query) => query !== value);
      newQueries.forEach((newQuery) => {
        searchParams.append(name, newQuery);
      });
    } else {
      searchParams.append(name, value);
    }
    searchParams.set(Query.PageNumber, PAGES_START.toString());
    setSearchParams(searchParams);
  };

  const resetFilterParams = () => {
    FILTER_QUERIES.forEach((query) => {
      searchParams.delete(query);
    });
    searchParams.set(Query.PageNumber, PAGES_START.toString());
    setSearchParams(searchParams);
  };

  useEffect(() => {
    dispatch(fetchPromo());
    dispatch(fetchMinPrice())
      .then(unwrapResult)
      .then((result: string) => {
        setMinPricePlaceholder(result);
      })
      .catch((err) => setMinPricePlaceholder(''));

    dispatch(fetchMaxPrice())
      .then(unwrapResult)
      .then((result: string) => {
        setMaxPricePlaceholder(result);
      })
      .catch((err) => setMaxPricePlaceholder(''));
  }, [dispatch]);


  useEffect(() => {
    dispatch(fetchCameras({
      sortType: sortingParams.sortType,
      order: sortingParams.order,
      minPrice: filterParams.minPrice,
      maxPrice: filterParams.maxPrice,
      category: filterParams.category,
      type: filterParams.type,
      level: filterParams.level,
    }));
    setMinPrice(filterParams.minPrice);
    setMaxPrice(filterParams.maxPrice);
  }, [dispatch, sortingParams, filterParams]);


  return (
    <main>
      {banner && <Banner banner={banner}/>}
      <div className="page-content">
        <Breadcrumbs/>
        <section className="catalog">
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <CatalogAside
                filterParams={filterParams}
                handleFilterParamsChange={handleFilterParamsChange}
                checkMinPrice={checkMinPrice}
                checkMaxPrice={checkMaxPrice}
                handleMaxPriceChange={handleMaxPriceChange}
                handleMinPriceChange={handleMinPriceChange}
                minPricePlaceholder={minPricePlaceholder}
                maxPricePlaceholder={maxPricePlaceholder}
                minPrice={minPrice}
                maxPrice={maxPrice}
                resetFilterParams={resetFilterParams}
              />
              <CatalogContent
                cameras={cameras}
                sortingType={sortingParams.sortType}
                orderType={sortingParams.order}
                currentPage={currentPage}
                handleSortingSearchParams={changeSortingSearchParams}
                handleOrderSearchParams={changeOrderSearchParams}
                generateQueryParams={generateQueryParams}
                isDataLoading={isDataLoading}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Catalog;
