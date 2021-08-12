exports.successMessages = {
    created: "Created.",
    updated: "Updated.",
    deleted: "Deleted.",
}


exports.validationMessages = {
    emailMissing: "Email must be specified.",
    emailInvalid: "Email must be a valid email address.",
    passwordMissing: "Password must be specified.",
    passwordInvalid: "Password must be 6 characters or greater.",
    tokenMissing: "Token must be specified.",
}

exports.errorMessages = {
    linkNotFound: "This link doesn't exist",
    existingLink: "This link already exists.",
    reaction: "Action or Reaction invalid.",
    invalidToken: "Invalid token.",
    unknownUser: "Unknown user.",
    bannedUser: "Banned account. Please contact admin.",
    emailDuplication: "E-mail already in use.",
    validationError: "Validation error.",
    wrongCredentials: "Email or password wrong.",
    targetNotFound: "Target not found.",
    targetsLimit: "Targets limit."
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
    },
    unknownUser: {
        code: 17,
        message: "This user doesn't exist"
    }
}
