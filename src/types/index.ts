// This file defines TypeScript types and interfaces used throughout the application, ensuring type safety for project data and API responses.

export interface User {
    id: string;
    name: string;
    email: string;
    profilePicture?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    tasks: Task[];
}

export interface Task {
    id: string;
    title: string;
    completed: boolean;
    dueDate?: Date;
}

export interface ApiResponse<T> {
    data: T;
    error?: string;
}

export interface AuthToken {
    accessToken: string;
    expiresIn: number;
    tokenType: string;
}