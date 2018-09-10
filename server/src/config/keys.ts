import dotenv from 'dotenv'
dotenv.config()

export interface IConfigKeys {
  baseUrl: string
  mongoURI: string
}

const keys: IConfigKeys = {
  baseUrl: process.env.BASE_URL || 'http://localhost:5000',
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/af-relations-manager',
}

export default keys
