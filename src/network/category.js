import {request1} from './request'

export function getCategory() {
  return request1({
    url: '/category'
  })
}

export function getSubcategory(maitKey) {
  return request1({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function getCategoryDetail(miniWallkey, type) {
  return request1({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}