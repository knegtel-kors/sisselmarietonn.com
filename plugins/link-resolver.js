export default function (doc) {
  if (doc.isBroken) {
    return '/not-found'
  }

  if (doc.type === 'homepage') {
    return '/'
  }

  if (doc.type === 'article' && doc.data.type === 'about') {
    return `/${doc.uid}`
  }

  if (doc.type === 'article') {
    return `/${doc.data.type.toLowerCase()}/${doc.uid}`
  }

  return '/not-found'
}
