import * as utils from './utils.js'
import cookieLookup from './languageLookups/cookie.js'
import querystringLookup from './languageLookups/querystring.js'
import pathLookup from './languageLookups/path.js'
import headerLookup from './languageLookups/header.js'
import sessionLookup from './languageLookups/session.js'
import { extendOptionsWithDefaults } from './httpFunctions.js'

function getDefaults () {
  return extendOptionsWithDefaults({
    order: [/* 'path', 'session' */ 'querystring', 'cookie', 'header'],
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupSession: 'lng',
    lookupFromPathIndex: 0,

    // cache user language
    caches: false // ['cookie']
    // cookieExpirationDate: new Date(),
    // cookieDomain: 'myDomain'
  })
}

class LanguageDetector {
  constructor (services, options = {}, allOptions = {}) {
    this.type = 'languageDetector'
    this.detectors = {}

    this.init(services, options, allOptions)
  }

  init (services, options = {}, allOptions = {}) {
    this.services = services
    this.options = utils.defaults(options, this.options || {}, getDefaults())
    this.allOptions = allOptions

    this.addDetector(cookieLookup)
    this.addDetector(querystringLookup)
    this.addDetector(pathLookup)
    this.addDetector(headerLookup)
    this.addDetector(sessionLookup)
  }

  addDetector (detector) {
    this.detectors[detector.name] = detector
  }

  detect (req, res, detectionOrder) {
    if (arguments.length < 2) return
    if (!detectionOrder) detectionOrder = this.options.order

    let found
    detectionOrder.forEach(detectorName => {
      if (found || !this.detectors[detectorName]) return

      let detections = this.detectors[detectorName].lookup(req, res, this.options)
      if (!detections) return
      if (!Array.isArray(detections)) detections = [detections]

      detections.forEach(lng => {
        if (found || typeof lng !== 'string') return

        const cleanedLng = this.services.languageUtils.formatLanguageCode(lng)

        if (this.services.languageUtils.isWhitelisted(cleanedLng)) {
          found = cleanedLng
          req.i18nextLookupName = detectorName
        };
      })
    })

    if (!found) {
      let fallbacks = this.allOptions.fallbackLng
      if (typeof fallbacks === 'string') fallbacks = [fallbacks]
      if (!fallbacks) fallbacks = []

      if (Object.prototype.toString.apply(fallbacks) === '[object Array]') {
        found = fallbacks[0]
      } else {
        found = fallbacks[0] || (fallbacks.default && fallbacks.default[0])
      }
    };

    return found
  }

  cacheUserLanguage (req, res, lng, caches) {
    if (arguments.length < 3) return
    if (!caches) caches = this.options.caches
    if (!caches) return
    caches.forEach(cacheName => {
      if (this.detectors[cacheName] && this.detectors[cacheName].cacheUserLanguage) this.detectors[cacheName].cacheUserLanguage(req, res, lng, this.options)
    })
  }
}

LanguageDetector.type = 'languageDetector'

export default LanguageDetector
