import { Review } from '../types/review';
import { Cameras, Camera } from '../types/camera';
import { BreadcrumbsValue, BreadcrumbsLabel, BreadcrumbsPath } from '../const';

export const compareDates = (reviewA: Review, reviewB: Review) => Date.parse(reviewB.createAt) - Date.parse(reviewA.createAt);

export const handleScrollToTop = () => {
  window.scrollTo({ top: 0, behavior:
    'smooth'
  });
};

export const updateItem = (items: Cameras, newItem: Camera) => {
  const index = items.findIndex((item) => item.id === newItem?.id );

  if(index === -1) {
    return [...items, newItem];
  }

  items = [...items.slice(0, index),
    newItem,
    ...items.slice(index + 1)];
  return items;
};

export const changeBreadcrumbs = (crumb: string, title?:string) => {
  switch (crumb) {
    case BreadcrumbsValue.Main:
      return BreadcrumbsLabel.Main;
    case BreadcrumbsValue.Catalog:
      return BreadcrumbsLabel.Catalog;
    default:
      return title;
  }
};

export const getBreadcrumbsPath = (crumb: string) => {
  switch (crumb) {
    case BreadcrumbsValue.Main:
      return BreadcrumbsPath.Main;
    case BreadcrumbsValue.Catalog:
      return BreadcrumbsPath.Catalog;
    default:
      return 'Path not found';
  }
};
