import express from 'express';
import cors from 'cors';
import Contenedor from '../classes/Contenedor.js';
import upload from '../services/uploader.js';
const router = express.Router();
const productos = new Contenedor('./files/productos.txt');

router.use(express.json()); 
router.use(express.urlencoded({extended: true}));
router.use(cors());


//GETS
router.get('/', (req,res) => {+
    productos.getAll().then(result => {
        res.send(result);
    })
})

router.get('/:id', (req, res) => {
    let pId = req.params.id; 
    pId = parseInt(id);
    productos.getById(pId).then(result => {
        res.send(result);
    })
})

//POSTS
router.post('/',upload.single('image'),(req,res)=>{
    let file = req.file;
    let cuerpo = req.body;
    cuerpo.thumbnail = req.protocol+"://"+req.hostname+":8080"+'/images/'+file.filename; // protocol es https, luego ://, req.hostname es localhost, :8080 es el puerto que estamos usando
    productos.save(cuerpo).then(result => {
        res.send(result);
    })
})

//PUTS
router.put('/:id', (req,res) => {
    let pId = parseInt(req.params.id);
    let body = req.body;
    productos.updateProduct(pId,body).then(result => {
        res.send(result);
    })
})

// DELETES
router.delete('/:id', (req,res) => {
    let pId = parseInt(req.params.id);
    productos.deleteById(pId).then(result => {
        res.send(result);
    })
})

export default router;