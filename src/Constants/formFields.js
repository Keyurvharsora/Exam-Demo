export const loginFormFields = {
    email: {
        label: "Email",
        name: "email",
        type: "email",
    },
    password: {
        label: "Password",
        name: "password",
        type: "password",
    },
}

export const signupFormFields = {
    name: {
        label: "Name",
        name: "name",
        type: "text",
    },
    email: {
        label: "Email",
        name: "email",
        type: "email",
    },
    password: {
        label: "Password",
        name: "password",
        type: "password",
    },
    role: {
        label: "Role",
        name: "role",
        type: "select",
        options: [
            { value: "student", label: "Student" },
            { value: "teacher", label: "Teacher" },
        ],
    },
}

export const forgotPasswordFormFields = {
    email: {
        label: "Email",
        name: "email",
        type: "email",
    },
}

export const resetPasswordFormFields = {
    oldPassword: {
        label: "Old Password",
        name: "oldPassword",
        type: "password",
    },
    Password: {
        label: "Password",
        name: "password",
        type: "password",
    },
    ConfirmPassword: {
        label: "Confirm Password",
        name: "confirmPassword",
        type: "password",
    },
}

export const newPasswordFormFields = {
    Password: {
        label: "Password",
        name: "password",
        type: "password",
    },
    ConfirmPassword: {
        label: "Confirm Password",
        name: "confirmPassword",
        type: "password",
    },
}
