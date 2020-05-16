import expect from 'expect.js'
import i18nextMiddleware from '../index.js'
import i18next from 'i18next'
import fastify from 'fastify'

i18next.init({
  fallbackLng: 'en',
  preload: ['en', 'de'],
  saveMissing: true
})

describe('missingKeyHandler fastify', () => {
  describe('handling a request', () => {
    it('should work', (done) => {
      const app = fastify()
      app.post('/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18next))

      app.inject({
        method: 'POST',
        url: '/en/translation',
        body: { miss: 'key' }
      }, (err, res) => {
        expect(err).not.to.be.ok()
        expect(res.body).to.eql('ok')
        done()
      })
    })
  })
})
