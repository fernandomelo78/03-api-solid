import 'dotenv/config'
import {z} from 'zod'

const envschema = z.object({
    NODE_ENV : z.enum(['dev','test','production']).default('dev'),
    PORT:z.coerce.number().default(3334),
    DATABASE_URL: z.string()
})


const _env = envschema.safeParse(process.env)

if (_env.success ==false){
    console.error('Invalide environment variables',_env.error.format())

    throw new Error('Invalide Environment variables')
}

export const env = _env.data
