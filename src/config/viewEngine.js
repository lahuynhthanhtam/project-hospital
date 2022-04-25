import express from "express"

const configViewEngine = (app) => {
    // Cấu hình: static(Khi muốn lấy 1 ảnh trên server thì ta chỉ lấy ảnh trong thư mục public)
    app.use(express.static('./src/public'))
    app.set('view engine', "ejs") //gõ được logic trong file HTML(if else, vòng lặp ,...)
    app.set('views', "./src/views") //Tự động lấy đường link tới views
}

module.exports = configViewEngine