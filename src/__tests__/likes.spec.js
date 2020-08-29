const request = require('supertest')
const app = require('../app')

describe('Likes', () => {
  it('should be able to give a like to the repository', async () => {
    const repository = await request(app)
      .post('/repositories')
      .send({
        url: 'https://github.com/Rocketseat/umbriel',
        title: 'Umbriel',
        techs: ['Node', 'Express', 'TypeScript'],
      })

    let response = await request(app).post(`/repositories/${repository.body.id}/likes`)

    expect(response.body).toMatchObject({
      likes: 1,
    })

    response = await request(app).post(`/repositories/${repository.body.id}/likes`)

    expect(response.body).toMatchObject({
      likes: 2,
    })
  })

  it('should not overwrite like count when changing a repo ', async () => {
    const repository = await request(app)
      .post('/repositories')
      .send({
        url: 'https://github.com/Rocketseat/umbriel',
        title: 'Umbriel',
        techs: ['Node', 'Express', 'TypeScript'],
      })

    let response = await request(app).post(`/repositories/${repository.body.id}/likes`)

    expect(response.body).toMatchObject({
      likes: 1,
    })

    let updateResponse = await request(app)
      .put(`/repositories/${repository.body.id}`)
      .send({
        url: 'https://github.com/Rocketseat/umbriel',
        title: 'NewTitle',
        techs: ['Node', 'Express', 'TypeScript'],
      })
    expect(updateResponse.body.likes).toEqual(1)
  })

  it('should not be able to like a repository that does not exist', async () => {
    await request(app).post(`/repositories/123/likes`).expect(404)
  })
})
