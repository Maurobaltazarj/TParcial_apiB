const express = require('express');
const app = express();

app.use(express.json());

const productos = [
    {id: 0, nombre: 'samsung s24 ultra', precio: 2000, categoria: 'telefonia'},
    {id: 1, nombre: 'escritorio para oficina', precio: 7000, categoria: 'muebles'},
    {id: 2, nombre: 'pelota profesional AFA', precio: 2345, categoria: 'deportes'},
    {id: 3, nombre: 'microondas atma', precio: 23452, categoria: 'electrodomesticos'},
];

app.get ('/',(req, res) => {
    res.send('Inicializamos');
});


app.get('/productos', (req, res) => {
    res.send(productos);
});


app.get('/productos/nombre/:nombre', (req, res) => {
    const producto = productos.find(c => c.nombre === req.params.nombre);
    if (!producto) return res.status(404).send('No existe el producto ingresado');
    res.send(producto);
});


app.get('/productos/filtrarPrecioMin', (req, res) => {
    const precios = productos.map(p => p.precio).sort((a, b) => a - b);
    res.send(precios);
});


app.get('/productos/filtrarPrecioMax', (req, res) => {
    const precios = productos.map(p => p.precio).sort((a, b) => b - a);
    res.send(precios);
});


app.get('/productos/categoria/:categoria', (req, res) => {
    const categoria = productos.filter(c => c.categoria === req.params.categoria);
    if (categoria.length === 0) return res.status(404).send('No se encontro el producto ingresado');
    res.send(categoria);
});


app.get('/productos/categorias', (req, res) => {
    const conteoCategorias = productos.reduce((acc, producto) => {
        if (acc[producto.categoria]) {
            acc[producto.categoria]++;
        } else {
            acc[producto.categoria] = 1;
        }
        return acc;
    }, {});
    res.send(conteoCategorias);
});


const port = process.env.PORT || 3232;
app.listen(port, () => console.log(`escuchando en el puerto ${port}...`));