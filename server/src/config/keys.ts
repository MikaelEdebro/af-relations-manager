import dotenv from 'dotenv'
dotenv.config()

export interface IConfigKeys {
  baseUrl: string
  mongoURI: string
}

const keys: IConfigKeys = {
  baseUrl: process.env.BASE_URL || 'http://localhost:5000',
  mongoURI:
    process.env.MONGO_URI || 'mongodb://af:super132@ds251902.mlab.com:51902/af-relations-manager',
}

export default keys
