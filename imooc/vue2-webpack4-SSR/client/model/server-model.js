import appConfig from '../../app.config'
import createDb from '../../server/db/db'

const db = createDb(appConfig.db.appId, appConfig.db.appKey)

export default {
  getAllTodos () {
    return db.getAllTodos()
  }
}
