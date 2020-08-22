module.exports.createRepositoryFromBody = (id, { title, url, techs }) => ({
  id,
  title,
  url,
  techs,
  likes: 0
})
