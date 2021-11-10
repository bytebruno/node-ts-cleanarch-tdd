import { Collection, MongoClient } from 'mongodb'

export const MONGO_URL = process.env.MONGO_URL ?? ''

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect (uri: string): Promise<void> {
    const options = { }
    this.client = await MongoClient.connect(MONGO_URL, options)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map (collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return { ...collectionWithoutId, id: _id.toHexString() }
  }
}
