// importamos express
const express = require('express');

// creamos una instancia
const app = express();

// configuramos express para que pueda manejar archivos json
app.use(express.json());

// creamos una base de datos con los productos
const productos = [
    {id: 0, nombre: 'samsung s24 ultra', precio: 2000, categoria: 'telefonia'},
    {id: 1, nombre: 'escritorio para oficina', precio: 7000, categoria: 'muebles'},
    {id: 2, nombre: 'pelota profesional AFA', precio: 2345, categoria: 'deportes'},
    {id: 3, nombre: 'microondas atma', precio: 23452, categoria: 'electrodomesticos'},
];

// ruta principal
app.get ('/',(req, res) => {
    res.send('Inicializamos');
});


// modificamos la ruta
app.get('/productos', (req, res) => {
    // nos muestra los productos
    res.send(productos);
});


// modificamos la ruta
app.get('/productos/nombre/:nombre', (req, res) => {
    // buscamos el producto en la base de datos
    const producto = productos.find(c => c.nombre === req.params.nombre);
    // error de pagina al no encontrar el producto 
    if (!producto) return res.status(404).send('No existe el producto ingresado');
    // nos muestra el producto
    res.send(producto);
});


// creamos ruta de acceso
app.get('/productos/filtrarPrecioMin', (req, res) => {
    // mapeamos los precios de los productos 
    // y los ordenamos de menor a mayor(por precio)
    const precios = productos.map(p => p.precio).sort((a, b) => a - b);
    res.send(precios);
});


// creamos ruta de acceso
app.get('/productos/filtrarPrecioMax', (req, res) => {
    // mapeamos los precios de los productos 
    // y los ordenamos de mayor a menor(por precio)
    const precios = productos.map(p => p.precio).sort((a, b) => b - a);
    res.send(precios);
});


// creamos ruta de acceso
app.get('/productos/categoria/:categoria', (req, res) => {
    // filtramos por productos por categorias
    const categoria = productos.filter(c => c.categoria === req.params.categoria);
    if (categoria.length === 0) return res.status(404).send('No se encontro el producto ingresado');
    // nos devuelve la categoria que buscabamos
    res.send(categoria);
});


// creamos ruta de acceso
app.get('/productos/categorias', (req, res) => {
    // creamos funcion para saber cuantos productos hay por categoria
    const conteoCategorias = productos.reduce((acc, producto) => {
        if (acc[producto.categoria]) {
            acc[producto.categoria]++;
        } else {
            acc[producto.categoria] = 1;
        }
        return acc;
    }, {});
    // nos devuelve la funcion
    res.send(conteoCategorias);
});


app.get('/productos/promedio'){
    const precioUnitario = productos.map(p => p.precio);
    const total = 0 + precioUnitario;
    res.send(total);
}


// creamos ruta post para poder realizar cambios mediante el id del producto
app.post('/produtos/codificar/:id/nombre', (req, res) => {
    // creamos el producto
    const producto = {
        id: producto.length + 1,
        nombre: req.body.nombre,
        precio: parseInt(req.body.precio),
        categoria:req.body.categoria,
    }

    // lo pusheamos a la base de datos
    productos.push(producto);
    // refrescamos la base
    res.send(productos);
});



// creamos el puerto
const port = process.env.PORT || 3232;
app.listen(port, () => console.log(`escuchando en el puerto ${port}...`));