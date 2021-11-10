import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect (uri: string): Promise<void> {
    const options: any = { useNewUrlParser: true, useUnifiedTopology: true }
    this.client = await MongoClient.connect(uri, options)
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
