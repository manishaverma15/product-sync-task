type User = {
    email: string;
    password?: string;
    role: UserRole;
}

declare enum UserRole {
    admin = 'admin',
    viewer = 'viewer'
}