import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    // Use the v6 auth API: authenticate the request using the configured
    // guard(s). This will throw when authentication fails and result in
    // a 401 response from the framework.
    if (options.guards && options.guards.length) {
      await ctx.auth.authenticate()
    } else {
      await ctx.auth.authenticate()
    }
    return next()
  }
}
