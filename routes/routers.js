const router =require("express").Router()

router.get('/education', education)

router.post('/education', education)      //admins only

router.patch('/education', education)     //admins only

router.get('/experience',experience)

router.post('/experience',experience)      //admins only

router.patch('/experience',experience)    //admins only

router.get('/skills',skills)

router.post('/skills',skills)             //admins only

router.patch('/activities',activities)        //admins only

router.get('/activities',activities)

router.patch('/projects',projects)      //admins only

router.get('/projects',projects)   


router.get('/personalInfo',personalInfo)

router.get('/resume',resume)


router.delete('/projects', projects)     //admins only

module.exports=router