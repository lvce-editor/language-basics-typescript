import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Probot } from 'probot'

type RouteHandler = (request: IncomingMessage, response: ServerResponse) => boolean | Promise<boolean>

export const createApp = (env: BotEnv) => {
  return (app: Probot, { addHandler }: { addHandler: (handler: RouteHandler) => void }): void => {
    addHandler(createHandleUserDataUploadRequest(env))
  }
}
