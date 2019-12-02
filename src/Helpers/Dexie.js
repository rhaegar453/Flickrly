import Dexie from 'dexie';

let db=new Dexie("flickrly");
db.version(1).stores({groups:"&groupid,text", search:"&groupid, text"});

export default db;