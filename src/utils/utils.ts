import { Review } from '../types/review';
import { Cameras, Camera } from '../types/camera';
import { BreadcrumpsValue, BreadcrumsLabel, BreadcrumpsPath } from '../const';

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

export const changeBreadcrumps = (crump: string, title?:string) => {
  switch (crump) {
    case BreadcrumpsValue.Main:
      return BreadcrumsLabel.Main;
    case BreadcrumpsValue.Catalog:
      return BreadcrumsLabel.Catalog;
    default:
      return title;
  }
};

export const getBreadcrumpsPath = (crump: string) => {
  switch (crump) {
    case BreadcrumpsValue.Main:
      return BreadcrumpsPath.Main;
    case BreadcrumpsValue.Catalog:
      return BreadcrumpsPath.Catalog;
    default:
      return 'Path not found';
  }
};
