const { Router } = require('express');
const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');


//create,find,update,delete
 
 
router.get('/',userController.test);
router.get('/login',userController.login);
//router.get('/home',userController.access);


router.get('/home',userController.view);
router.post('/home',userController.find);

router.get('/tracking',userController.trackaccess);

router.get('/newActivity',userController.enter);
router.post('/tracking',userController.check);
router.post('/newActivity',userController.insert);

router.get('/add-user',userController.form);
router.post('/add-user',userController.create);
router.get('/edit-user/:id',userController.edit);
router.post('/edit-user/:id',userController.update);
router.get('/:id',userController.delete);
router.get('/view-user/:id',userController.viewall);







module.exports=router;