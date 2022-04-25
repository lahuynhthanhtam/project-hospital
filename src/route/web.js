import express from 'express';
import homeController from '../controller/homeController'


let router = express.Router();

// app là ứng dụng (1 server có 1 ứng dụng)
let initWebRoutes = (app) => {

    // Khi người dùng truy cập vào link '/' sẽ goi tới hàm homeController -> trả ra giá trị của hàm này
    router.get('/', homeController.getHomePage)
    router.get('/love', homeController.getLovePage)
    router.post('/post-girl', homeController.postGirlPage)
    router.get('/getCRUD', homeController.getDisplayCRUD)
    router.get('/editCRUD', homeController.getEditCRUD)
    router.post('/put-girl', homeController.putCRUD)
    router.get('/deleteCRUD', homeController.deleteCRUD)
    return app.use('/', router);
}
module.exports = initWebRoutes