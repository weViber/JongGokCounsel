const axios = require('axios');

exports.aligo = async(result) => {
    const { name, phone, reqdate, resdate, option } = result
    const _reqdate = String(reqdate)
    const _resdate = String(resdate)
    const setReqdate = `${_reqdate.slice(0,4)}년 ${_reqdate.slice(4,6)}월 ${_reqdate.slice(6,8)}일}` || reqdate
    const setResdate = `${_resdate.slice(0,4)}년 ${_resdate.slice(4,6)}월 ${_resdate.slice(6,8)}일}` || resdate

    const message = `신규 상담이 접수되었습니다.\n\n상담 정보\n\n상담 의뢰인 : ${name} 님\n전화번호 : ${phone}\n접수 날짜 : ${setReqdate}\n상담 희망 날짜 : ${setResdate}\n상담 분류 : ${option}`

    await axios.post('https://apis.aligo.in/send/', null, {
        params: {
            key: "3hwizw8ew1cd8qfwclrqa6mwps259gsm",
            user_id: "lyncare",
            sender: "0269567985",
            receiver: "01085959869",
            msg: message,
            title: "법무법인 정곡 신규 상담 알림"
        },
    }).then((result) => {
        console.log('Success : ', result)
    }).catch((err) => {
        console.log('ERR Message : ', err)
    })
}