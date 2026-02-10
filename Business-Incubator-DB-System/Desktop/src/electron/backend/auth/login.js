import { findUserByEmail } from '../models/user.model.js';
import bcrypt from 'bcrypt';
export default async function loginRequest(credentials) {
    try {
        const user = await findUserByEmail(credentials.email);
        console.log('User found:', user);
        if (!user) {
            return { success: false, message: "User not found" };
        }
        if(user.email !== credentials.email) {
            return { success: false, message: "Email does not match" };
        }
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordMatch) {
            return { success: false, message: "Incorrect password" };
        }
        if(user.role !== 'admin') {
            return { success: false, message: "Access denied: Admins only" };
        }
        return { success: true, message: "Login successful", user };
    } catch (error) {
        console.error('Error during login:', error);
        return { success: false, message: "An error occurred during login" };
    }
};