const db = require("../models");
const { aligo } = require('../api/aligo')
const { reservation : Reservation } = db;

exports.reservation = async (req, res) => {
    const date = new Date();
    const year = date.getFullYear();
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var day = ('0' + date.getDate()).slice(-2);
    const reservation = new Reservation({
        name : req.body.name,
        phone : req.body.phone,
        password : req.body.password,
        reqdate : year + month + day,
        resdate : req.body.resdate,
        option : req.body.option,
        text : req.body.text,
        RVstatus : '신규상담'
    })
    await reservation.save().then(
        result => {
            aligo(result)
            return res.status(200).json({ message : "성공" , date : date, result })
        }
    ).catch(err => console.log(err))
}

exports.confirm = async (req, res) => {
    Reservation.findOne({ name: req.body.name, phone : req.body.phone }).sort({ _id : -1 }).then(result=>{
            if(result == null){
                res.status(200).json({message : "Fail"})
            } else {
                if(result.RVstatus == '상담취소'){
                    res.status(200).json({message : "Fail"})
                } else {
                    if(result.password == req.body.password) {
                        res.status(200).json(result)
                    } else {
                        res.status(200).json({message : "PasswordErr"})
                    }
                }
            }
        }
    )
}

exports.update = async  (req, res) => {
    Reservation.updateOne({_id : req.body._id}, {$set : {
        name : req.body.name,
        phone : req.body.phone,
        resdate : req.body.resdate,
        option : req.body.option,
        text : req.body.text
    }}).then(result => res.status(200).json(result))
}

exports.changetime = async  (req, res) => {
    Reservation.updateOne({_id : req.body._id}, {$set : {
        name : req.body.name,
        phone : req.body.phone,
        resdate : req.body.resdate,
        option : req.body.option,
        text : req.body.text
    }}).then(result => res.status(200).json({message : "Success"}))
}
exports.cancel = async (req, res) => {
    Reservation.deleteOne({_id : req.body._id}).then(result => res.status(200).json(result))
}