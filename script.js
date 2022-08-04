//  Implementar programa que contenga una clase llamada Contenedor que reciba data.json e implemente los siguientes métodos:
//save - Guarda el objeto en el archivo data.json del id designado.
//getById- (number) - object - Recibe un id y devuelve el objeto con ese id. Si no existe devuelve null.
//getAll- devuelve un array con todos los objetos.
//deleteAll- elimina todos los objetos .
//deleteById- (number) - elimina el objeto con el id recibido.



const { promises: fs } = require('fs')
class Contenedor {
    static newId = 0;
    constructor(ruta) {
        this.ruta = ruta;
    }
    async save(obj) {
        let objs = await this.getAll();
        if (objs.length == 0) {
            Contenedor.newId = 1;
        } else {
            Contenedor.newId++;
        }
        obj = { id: Date.now(), ...obj }
        let datos = [...objs, obj]
        try {
            await fs.writeFile(this.ruta, JSON.stringify(datos, null, 2))
        } catch (error) {
            throw new Error(`error cannot delete data ${error}`)
        }

    }
    async getById(id) {
        let objs = await this.getAll();
        let obj = objs.filter(o => o.id == id);
        if (obj.length == 0) {
            return `Unable to get data with id: ${id}`
        }
        return obj
    }
    async getAll() {
        try {
            const objs = await fs.readFile(this.ruta,);
            return JSON.parse(objs);
        } catch (error) {
            return [];
        }
    }
    async updateById(obj) {
        let objs = await this.getAll();
        let index = objs.findIndex(o => o.id == obj.id);
        objs[index] = obj;
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
        } catch (error) {
            `Data cannot be modified`
        }
    }

    async deleteById(id) {
        let objs = await this.getAll();
        let obj = objs.filter(o => o.id != id)
        try {
            await fs.writeFile(this.ruta, JSON.stringify(obj, null, 2))
        } catch (error) {
            return `Can't delete that record`
        }
    }
    async deleteAll() {
        try {
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error) {
            return `Unable to delete data`
        }
    }
}
let product = new Contenedor('./data.json')
/*product.save({
    name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops", "price": 109.95, "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
        "rate": 3.9,
        "count": 120
    }
})*/
//product.deleteById(1659632343365)
//product.updateById({ id: 1659632343365, name: " pc lg", category:"pc",price:100, description:"pc", image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", rating: { rate: 3.9, count: 120 } })
product.getById(1659632209881)
    // product.deleteAll()

    .then(data => console.log(data))
    .catch((err => console.log(err)))
    .finally(() => console.log('finish'))