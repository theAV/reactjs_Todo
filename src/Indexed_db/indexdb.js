/**
 * Indexed DB services
 */
/*class IDB {
    InitDB() {
        if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB.")
        }
        return new Promise((resolve, reject) => {
            let request = window.indexedDB.open("todo_d", 1);
            request.onerror = (event) => {
                reject("error")
            };
            request.onsuccess = (event) => {
                resolve(request.result);
            };
            request.onupgradeneeded = (event) => {
                var db = event.target.result;
                db.createObjectStore("todolist", { keyPath: "id" });
            }
        })
    }

    addTodb(obj) {
        console.log(obj)
        this.InitDB().then((db) => {           
            var request = db.transaction(["todolist"], "readwrite")
                .objectStore("todolist")
                .add({ id: obj.id, text: obj.text, priority: obj.priority, done: obj.done });
            
            request.onsuccess = (event) => {
                // alert("Kenny has been added to your database.");
            };

            request.onerror = (event) => {
                // alert("Unable to add data\r\nKenny is aready exist in your database! ");
            }
        }, (err) => {
            console.log(err)
        }).catch(function (err) {
            console.log(err);
        })
    }
}
export default new IDB();*/

import Dexie from 'dexie';

const db = Dexie('todos');

db.version(1).stores({ todos: '++id' });

export default db;