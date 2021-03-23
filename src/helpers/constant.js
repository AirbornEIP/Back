exports.urls = {
    subscribeAfterTrial: "pagechecker.io/subscribe",
    authPayment: "pagechecker.io/auth-payment"
}

exports.successMessages = {
    registration: "Registration success.",
    login: "Login success.",
}

exports.validationMessages = {
    emailMissing: "Email must be specified.",
    emailInvalid: "Email must be a valid email address.",
    passwordMissing: "Password must be specified.",
    passwordInvalid: "Password must be 6 characters or greater.",
    tokenMissing: "Token must be specified.",
}

exports.errors = {
    wrongJwt: {
        code: 0,
        message: ""
    },
    unknownUser: {
        code: 1,
        message: "Unknown user."
    },
    bannedUser: {
        code: 2,
        message: "Banned account. Please contact admin."
    },
    emailDuplication: {
        code: 3,
        message: "E-mail already in use."
    },
    validationError: {
        code: 4,
        message: "Validation error."
    },
    wrongCredentials: {
        code: 5,
        message: "Email or password wrong."
    },
    removeMissing: {
        code: 6,
        message: "Remove missing"
    },
    missingPlan: {
        code: 7,
        message: "Plan not found"
    },
    planAlreadyExist: {
        code: 8,
        message: "This fly plan already exists"
    },
    wrongUrl: {
        code: 9,
        message: "Wrong url"
    },
    urlUndefined: {
        code: 10,
        message: "Url is undefined"
    },
    nameUndefined: {
        code: 11,
        message: "Name is undefined"
    },
    usernameMissing: {
        code: 12,
        message: "Username is missing"
    },
    missArgument: {
        code: 13,
        message: "Airport or token are missed in the body"
    },
    wrongBody: {
        code: 14,
        message: "Wrong body"
    },
    noOnePlan: {
        code: 15,
        message: "No plan find"
    },
    wrongAirport: {
        code: 16,
        message: "This airport doesn't exist"
    }
}
