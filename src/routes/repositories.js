const { Router } = require('express');

const {
  repositoryNotFoundError, created, success, noContent,
} = require('../utils');

function initRoutes(db) {
  const repoRouter = new Router();

  repoRouter.param(':id', async (req, res, next, id) => {
    const repository = await db.getById(id);

    if (!repository) {
      return repositoryNotFoundError(res);
    }

    req.repository = repository;
    return next();
  });

  repoRouter.get('/', async ({ body }, res) => {
    const results = await db.list(body.title);

    success(res, results);
  });

  repoRouter.post('/', async ({ body }, res) => {
    const repository = await db.create(body);

    created(res, repository);
  });

  repoRouter.put('/:id', async ({ body, params }, res) => {
    const { title, techs, url } = body;
    const repository = await db.update(params.id, { title, techs, url });

    success(res, repository);
  });

  repoRouter.delete('/:id', async ({ params }, res) => {
    await db.remove(params.id);

    noContent(res);
  });

  repoRouter.post('/:id/likes', async ({ params, repository }, res) => {
    const updatedRepository = await db.update(params.id, {
      likes: repository.likes + 1,
    });

    created(res, updatedRepository);
  });

  return repoRouter;
}

module.exports = initRoutes;
