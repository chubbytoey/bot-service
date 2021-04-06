import merge from 'lodash.merge'

const environment = process.env.PROJECT_ENV || 'local'

const config = {
  version: '0.1',
  environment,
  endpoint: {
    backend: 'https://service-bot-demo.herokuapp.com'
  },
  authentication: {
    storageName: 'bot-service'
  }
}

const runtimeConfig = {
  endpoint: {
    backend: process.env.ENDPOINT_BACKEND
  }
}

const environmentConfig = {
  local: {
    endpoint: {
      backend: 'https://service-bot-demo.herokuapp.com'
    }
  },
  development: {
    endpoint: {
      backend: 'https://service-bot-demo.herokuapp.com'
    }
  },
  production: {
    endpoint: {
      backend: 'https://service-bot-demo.herokuapp.com'
    }
  }
}

const mergeConfig = (baseConfig, replaceConfig) => {
  // eslint-disable-next-line array-callback-return
  Object.keys(baseConfig).map((key) => {
    if (replaceConfig[key] !== undefined) {
      if (baseConfig[key] instanceof Object) {
        baseConfig[key] = merge(baseConfig[key], replaceConfig[key])
      } else {
        baseConfig[key] = replaceConfig[key]
      }
    }
  })
}

mergeConfig(config, environmentConfig[environment])
mergeConfig(config, runtimeConfig)

export default config
