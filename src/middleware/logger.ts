import pino from 'pino'

const logger = pino()

export const loggerMiddleware = () => {
  const after = async (req: any) => {
    try {
      logger.info(req)
      return Promise.resolve()
    } catch (e) {
      logger.error(e)
    }
  }
  return {
    after
  }
}
