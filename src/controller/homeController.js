import db from '../models/index'
import CRUDService from '../services/CRUDServices'


// Mục đích: 1.của file này là lấy địa chỉ của file views, rồi truyền đến router để phân quyền.
// 2. Lấy giá trị data của thèn file server để làm thông tin truyền xuống cho file views show ra giao diện
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data),
        })
    } catch (err) {
        console.log(err)
    }
}
let getLovePage = (req, res) => {
    return res.render('lovepage.ejs');
}
let postGirlPage = async (req, res) => {
    const message = await CRUDService.createNewUser(req.body);
    // console.log(message);
    return res.render('girlpage.ejs');
}

let getDisplayCRUD = async (req, res) => {
    // const display = await CRUDService.getUser(res.body);
    let data = await CRUDService.getAllUser();
    console.log('---------------------')
    console.log('---------------------')

    console.log(data)
    return res.render('displayCRUD.ejs', {
        data: data,
    });
}

let getEditCRUD = async (req, res) => {
    let userId = await req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        if (userData) {
            return res.render('editCRUD.ejs', {
                userData: userData,
            })
        }
        else {
            return res.send(404)
        }
    }
    else {
        return res.send('Not found')
    }
}
// When trigger on button Update
let putCRUD = async (req, res) => {
    let data = await req.body
    let allUsers = await CRUDService.updateUserData(data)
    return res.render('displayCRUD.ejs', {
        data: allUsers, //Tên key phải trùng tên với key display trước đó để k bị lỗi
    })
}
let deleteCRUD = async (req, res) => {
    let id = await req.query.id
    if (id) {
        await CRUDService.deleteUserById(id)
        return res.send('delete user')
    }
    else {
        return res.send('Not value')
    }
}
module.exports = {
    getHomePage: getHomePage,
    getLovePage: getLovePage,
    postGirlPage: postGirlPage,
    getDisplayCRUD: getDisplayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}