import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import authRouter from '../../api/src/routes/auth.route'
import { postRouter } from '../../api/src/routes/post.route'
import { cors } from 'hono/cors'
import { userRouter } from '../../api/src/routes/user.route'
import helloRouter from '../../api/src/routes/hello.route'
import type { JwtVariables } from 'hono/jwt'
import actualizarRouter from '../../api/src/routes/actualizar.route'

type Variables = JwtVariables

// Indicamos que usaremos el Edge Runtime
export const runtime = 'edge'

// Creamos la instancia de Hono y definimos un basePath "/api"
// (esto significa que todas las rutas estarán bajo /api)
const app = new Hono<{ Variables: Variables }>().basePath('/api')

// Habilitar CORS
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

// Endpoint de prueba en /api (por ejemplo, https://tu-app.vercel.app/api)
app.get('/', (c) => c.text('API funcionando'))

// Montar los routers en sus rutas correspondientes:
// Las rutas definidas aquí se unirán al basePath "/api"
// Ejemplo: la ruta para hello será /api/v1/hello
app.route('/v1/hello', helloRouter)
app.route('/v1/auth', authRouter)
app.route('/v1/posts', postRouter)
app.route('/v1/user', userRouter)
app.route('/v1/actualizar', actualizarRouter)

// Exportamos los manejadores para los métodos HTTP que necesitemos
export const GET = handle(app)
export const POST = handle(app)
