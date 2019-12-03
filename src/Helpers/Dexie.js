import Dexie from 'dexie';

let db = new Dexie("flickrly");
db.version(1).stores({ groups: "&groupid,text,isFavorite", search: "&groupid, text", images: "title,groupid,isFavorite" });

export default db;