import bcrypt from 'bcryptjs'
import { use } from 'express/lib/application';
import db from '../models/index'


const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                firstName: data.firstName,
                password: hashPasswordFromBcrypt,
                lastName: data.lastName,
                email: data.email,
                address: data.address,
                gender: data.gender,
                rodeId: data.rodeId === '1' ? true : false,
                phoneNumber: data.phoneNumber,
            })
            resolve('successfully');
        } catch (error) {
            reject(error);
        }
    })
};

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject('Not value' + error);
        }
    })
}

let getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
}
let getUserInfoById = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }, raw: true
            })
            if (user) {
                resolve(user)
            }
            else {
                resolve([])
            }

        } catch (error) {
            reject(error);
        }
    })
}

let updateUserData = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName; //user.: giá trị cũ trong db,data.: giá trị mới sửa lại 
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                let allUsers = await db.User.findAll()
                resolve(allUsers)
            }
            else {
                resolve()
            }
        } catch (error) {
            reject(error);
        }
    })
}
let deleteUserById = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Cách này theo video mà chạy k dc
            // let user = await db.User.findOne({
            //     where: { id: id }, raw: true
            // })
            // if (user) {
            //     user.destroy()
            // }

            // Fixed bằng cách này nhưng chưa chắc
            await db.User.destroy({ where: { id: id }, raw: true });
            resolve()
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
};


