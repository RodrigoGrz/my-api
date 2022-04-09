interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    avatar: string;
    created_by: string;
    updated_by: string;
}

export { ICreateUserDTO };