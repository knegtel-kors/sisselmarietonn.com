import get from 'lodash.get'
export default function (doc) {
  if (doc.isBroken) {
    return '/not-found'
  }

  if (doc.type === 'homepage') {
    return '/'
  }
  
  const type = get(doc, [ 'data', 'type' ])
  console.log(doc.type);
  
  if (doc.type === 'article' && type === 'about') {
    return `/${doc.uid}`
  }

  if (doc.type === 'article') {
    return `/${type.toLowerCase()}/${doc.uid}`
  }

  return '/not-found'
}
