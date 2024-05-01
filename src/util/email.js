export default {
    checkEmail: function (email) {
        // eslint-disable-next-line no-useless-escape
        let pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5]+)\@(([A-Za-z0-9_\-\.]+)\.([A-Za-z]{2,10}))$/;
        // let email_list = pattern.exec(email)
        let email_list = pattern.test(email)
        if (email_list === false)
            return false
        // if (email_blacklist.includes(email_list[2]))
        //     return false
        return true

    }

}

// let email_blacklist = ['yopmail.com']
