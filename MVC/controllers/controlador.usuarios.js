const Usuarios = require('../models/modelo.usuarios')

//Listar Usuarios
module.exports.listarUsuarios = async ()=>{
    try {
        let resultado = await Usuarios.listar()
        return resultado
    }catch (err){
        console.log('Error de modelos' + err)
        throw new Error ('Ocurrio un problema en el controlador listar usuarios')
    }
} 

//Guardar un producto
module.exports.guardarUsuario = async (data) => {
    try {
        let resultado = await Usuarios.nuevoUsuario(data)
        return resultado;
    }catch (err){
        throw new Error ('Ocurrio un problema al realizar el alta en la DB')
    }
};

//Seleccionar un solo Producto por ID
module.exports.buscarUsuario = async (data)=>{
    try {
        let resultado = await Usuarios.buscarUsuarios(data)
        return resultado
    }catch (err) {
        throw new Error ('Ocurrio un problema en el controlador al BUSCAR usuario')
    }
}

//Modificar Producto
module.exports.modificarUsuario = async (data) => {
    try {
        await Usuarios.update({nombres: data.nombres, apellidos: data.apellidos, email: data.email, usuario: data.usuario, pass: data.pass, tipo_usuario: data.tipo_usuario}, {where: { id : data.id}})
        return true;
    }catch (err){
        throw new Error ('No se pudo actualizar el producto seleccionado')
    }
}

 //Eliminar un producto
module.exports.eliminarUsuario = async (data) => {
    try {
        await Usuarios.destroy({
            where: { id : data}
        })
        return true;
    }catch (err){
        throw new Error ('No se pudo eliminar el usuario seleccionado')
    }
};