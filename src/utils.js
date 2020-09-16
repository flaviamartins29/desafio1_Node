const repositoryNotFoundError = (res) => res.status(404).json({ error: 'Repo not found.' });

const created = (res, payload) => res.status(201).json(payload);

const success = (res, payload) => res.status(200).json(payload);

const noContent = (res) => res.status(204).send();

module.exports = {
  repositoryNotFoundError,
  created,
  success,
  noContent,
};
