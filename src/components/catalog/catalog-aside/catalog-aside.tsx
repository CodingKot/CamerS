import { ChangeEvent} from 'react';
import { CATEGORY_BUTTONS, Query, TYPE_BUTTONS, Category, Type, LEVEL_BUTTONS } from '../../../const';
import { FilterParams } from '../../../types/filter-params';

type CatalogAsideProps = {
  checkMinPrice: () => Promise<void>;
  checkMaxPrice: () => Promise<void>;
  handleMaxPriceChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  handleMinPriceChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  minPricePlaceholder: string;
  maxPricePlaceholder: string;
  handleFilterParamsChange: (value: string, queries: string[], name: Query) => void;
  filterParams: FilterParams;
  minPrice: string | null;
  maxPrice: string | null;
  resetFilterParams: () => void;
}


function CatalogAside ({checkMinPrice, checkMaxPrice, handleMaxPriceChange, handleMinPriceChange, minPricePlaceholder, maxPricePlaceholder, handleFilterParamsChange, filterParams, minPrice, maxPrice, resetFilterParams}: CatalogAsideProps) : JSX.Element {


  return (
    <div className="catalog__aside" data-testid="aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input type="number" name="price" placeholder={minPricePlaceholder}
                    onBlur={() => {
                      checkMinPrice();
                    }}
                    value={minPrice ?? ''}
                    onChange={handleMinPriceChange}
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input type="number" name="priceUp" placeholder={maxPricePlaceholder}
                    onBlur={() => {
                      checkMaxPrice();
                    }}
                    value={maxPrice ?? ''}
                    onChange={handleMaxPriceChange}
                  />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            {CATEGORY_BUTTONS.map((button) => (
              <div className="custom-checkbox catalog-filter__item" key={button.value}>
                <label>
                  <input type="checkbox" name={button.value}
                    checked={filterParams.category.includes(button.label)}
                    onChange={() => {
                      handleFilterParamsChange(button.label, filterParams.category, Query.Category);
                    }}
                  /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{button.label}</span>
                </label>
              </div>
            ))}
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            {TYPE_BUTTONS.map((button) => (
              <div className="custom-checkbox catalog-filter__item" key={button.value}>
                <label>
                  <input type="checkbox" name={button.value}
                    checked={filterParams.type.includes(button.label)}
                    disabled={(button.label === Type.Snapshot || button.label === Type.Film) && filterParams.category.includes(Category.Videocamera) && !filterParams.category.includes(Category.Photocamera)}
                    onChange={() => {
                      handleFilterParamsChange(button.label, filterParams.type, Query.Type);
                    }}
                  /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{button.label}</span>
                </label>
              </div>
            ))}
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            {LEVEL_BUTTONS.map((button) => (
              <div className="custom-checkbox catalog-filter__item" key={button.value}>
                <label>
                  <input type="checkbox" name={button.value}
                    checked={filterParams.level.includes(button.label)}
                    onChange={() => {
                      handleFilterParamsChange(button.label, filterParams.level, Query.Level);
                    }}
                  /><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">{button.label}</span>
                </label>
              </div>
            ))}
          </fieldset>
          <button className="btn catalog-filter__reset-btn" type="reset"
            onClick={resetFilterParams}
          >Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default CatalogAside;
