const { Router } = require('express');
const {check} = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateRol, validateEmail } = require('../helpers/db-validators');

const { usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
 } = require('../controllers/users');
 

const router = Router();




router.get('/', usersGet );



//Los middlewares para validar van como segundo argumento,
//si se pasa mas de uno tendrá que ir como un arreglo (entre [])
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),

    check('password', 'Password must have 6 letters').isLength({min: 6}),

    //check('email', 'The email address is invalid').isEmail(),
    check('email').custom(validateEmail),

    //check('rol', 'rol is invalid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( validateRol ),

    validateFields

] ,usersPost);





router.put('/:id', usersPut);


router.delete('/', usersDelete);


router.patch('/', usersPatch);







module.exports = router;