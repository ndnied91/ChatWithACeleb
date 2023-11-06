// data is being saved here
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url)); //gets path to lib folder
const file = join(__dirname, 'db.json');

let cached = global.lowDb; //checks the global cached value

if (!cached) {
  cached = global.lowDb = { conn: null };
}

export async function dbConnect() {
  if (!cached.conn) {
    const adapter = new JSONFile(file);
    const defaultData = [];
    const db = new Low(adapter, defaultData);
    db.data = { messageHistory: {} };

    cached.conn = db;
  }

  await cached.conn.read(); //gets data before starting chat

  // db.data = db.data || { messageHistory: {} };
  cached.conn.data ||= { messageHistory: {} };

  return cached.conn;
}
