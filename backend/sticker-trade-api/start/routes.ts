import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return { status: 'ok', name: 'copa-stickers-api' }
})

const AuthController = () => import('../app/Controllers/auth_controller.js')
const StickersController = () => import('../app/Controllers/stickers_controller.js')
const OrdersController = () => import('../app/Controllers/orders_controller.js')
const InventoryController = () => import('../app/Controllers/inventory_controller.js')

router
  .group(() => {
    router.post('register', [AuthController, 'register'])
    router.post('login', [AuthController, 'login'])
  })
  .prefix('auth')

router
  .group(() => {
    router.get('stickers', [StickersController, 'index'])
    router.get('stickers/:id', [StickersController, 'show'])

    router.get('orders', [OrdersController, 'index'])
    router.post('orders', [OrdersController, 'store'])

    router.get('inventory', [InventoryController, 'index'])
    router.post('inventory/sell', [InventoryController, 'sell'])
  })

  .prefix('v1')
  .use(middleware.auth())
