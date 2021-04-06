let rules = {
    noEmpty: '不允许为空!'
};



rules.user = {
    username: [
        { required: true, message: rules.noEmpty,}
    ],
    tel: [
        { required: true, message: rules.noEmpty, trigger: 'blur' }
    ],
    password: [
        { required: true, message: rules.noEmpty, trigger: 'blur' }
    ],
    passwordCheck: [
        { required: true, message: rules.noEmpty, trigger: 'blur' }
    ],
    numid: [
        { required: true, message: rules.noEmpty, trigger: 'blur' }
    ],
    sex: [
        { required: true, message: rules.noEmpty, trigger: 'blur' }
    ],
    level: [
        { required: true, message: rules.noEmpty, trigger: 'blur' }
    ]
}

export default rules;