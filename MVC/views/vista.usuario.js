const controladorUsuarios = require('../controllers/controlador.usuarios')
//const middUser = require('../../middleware/middUsuarios')

module.exports = async (app)=>{
    //ruta para enlistar
    app.get('/', async(req,res)=> {
        try {
            let resultado = await controladorUsuarios.listarUsuarios()
            //res.send(200,resultado)
            res.render('listarUsu.ejs', {results:resultado});
            res.send(200,resultado)
        }catch (err){
            console.log(err)
            res.status(400).json('Error al dirigirse a la ruta vistas')
        }
    })

    //Rutas para agregar y guardar un nuevo producto
    app.get('/create', async (req,res)=>{
        try{
            res.render('crearUsu.ejs')
            res.status(200).json('estas en la pagina crear');
        }catch (err){
            console.log(err)
            res.status(500).json('Error al dirigirse a la pagina CREAR')
        }
    })

    app.post('/save', async (req,res)=>{
        try{
            let resultado = await controladorUsuarios.guardarUsuario(req.body)
            if(resultado) {
                console.log('Usuario Agregado Correctamente');
                res.redirect('/');
                res.send(200,resultado)
            }
        }catch (err){
            res.status(500).json('No se puedo crear el usuarios')
        }
    })

    // ruta para modificar usuario
    app.get('/edit/:id', async (req,res)=>{
        let data = req.params.id;
        try {
            let resultado = await controladorUsuarios.buscarUsuario(data)
            res.render('editUsu.ejs', {result:resultado.dataValues })
            res.send(200,resultado[id]);
        }catch (err){
            res.status(500).json('Error al dirigirse a la pagina EDITAR')
        }
    })

    app.post('/update', async (req, res)=>{
        try {
            let resultado = await controladorUsuarios.modificarUsuario(req.body);
            if(resultado){
                res.redirect('/');
                res.send(200,resultado);
            }
        } catch (error) {
            res.status(500).json('No se puedo modificar el usuarios')
        }
    });

    // ruta para eliminar usuario
    app.get('/delete/:id', async (req,res)=>{
        let data = req.params.id;
        try {
            let resultado = await controladorUsuarios.eliminarUsuario(data)
            if(resultado){
                res.redirect('/');
                res.send(200,'Elemento eliminado');
            }      
        }catch (err){
            res.status(500).json('No se puedo eliminar el usuario')
        }
    })
}

