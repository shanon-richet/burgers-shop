import pg from 'pg'

const { Pool } = pg
const config = ({
    user: 'vzjwoxhpmgmwws', // Your newly created user
    host: 'ec2-107-23-76-12.compute-1.amazonaws.com',
    database: 'd6mgjfkpttihgp', // Your newly created database
    password: 'f74d36bfd9c5a25098a10881057024edb54f29d1856f202c7035d8ecbd47bad3', // Your newly created password
    port: 5432,
    connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
})
const pool = new Pool(config)
pool.connect()

export default pool