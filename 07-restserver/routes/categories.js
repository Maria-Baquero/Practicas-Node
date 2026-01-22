const { Router } = require('express');
const {check} = require('express-validator');

const {categoryExistById} = require('../helpers/db-validators');
const {validateFields, validateJWT, validateAdminRole} = require('../middlewares');
const { createCategory } = require('../controllers/categories');

const router = Router();



//obtener todas las categorias
router.get('/', controladorAqui);


//obtener categoria por id
router.get('/:id', [
    check('id').custom(categoryExistById)
],controladorAqui);



//crear categoria - privado
router.post('/', [
    validateJWT,
    check('name','Name is required').not().isEmpty(),
    validateFields

], createCategory);



//Actualizar categoria - privado
router.put('/:id', [
    validateJWT,
    check('id').custom(categoryExistById),
    validateFields
], controladorAqui);


//borrar una categoria - admin
router.delete('/:id', [
    validateJWT,
    check('id').custom(categoryExistById),
    validateAdminRole
], controladorAqui);





module.exports = router;