export default class StorageManager {

  static KEY = "tasukuDB";

  static load(){

    const data = localStorage.getItem(this.KEY);
    if(!data){
      const initialData = {
        users: [],
        spaces: [],
        tasks: [],
        session: null
      };

      localStorage.setItem(this.KEY, JSON.stringify(initialData));
      return initialData;
    }

    return JSON.parse(data);
  }

  static save(data){
    localStorage.setItem(this.KEY, JSON.stringify(data));
  }
}

/*
                    App inicia  
                        ↓  
                    StorageManager.load()   
                        ↓  
                    Carga base de datos del navegad or
                        ↓  
                    App modifica datos  
                        ↓  
                    StorageManager.save()   
                        ↓  
                    Datos guardados en localStorage 
*/


/* AÑADIR A app.js*/

/*
import StorageManager from "./infraestructure/storageManager.js";

const db = StorageManager.load();

console.log(db);
*/