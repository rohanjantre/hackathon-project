import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "../user/schemas/user.schema";

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
    ) { }

    // Get all users
    async getAllUsers() {
        return this.userModel.find().select("-password");
    }

    // Get single user
    async getUserById(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException("Invalid User ID");
        }

        const user = await this.userModel
            .findById(id)
            .select("-password");

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return user;
    }

    // Delete user
    async deleteUser(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException("Invalid User ID");
        }

        const user = await this.userModel.findByIdAndDelete(id);

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return {
            message: "User deleted successfully",
        };
    }

    // Update user role
    async updateRole(id: string, role: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException("Invalid User ID");
        }

        if (!["ADMIN", "USER"].includes(role)) {
            throw new BadRequestException(
                "Role must be ADMIN or USER",
            );
        }

        const user = await this.userModel.findByIdAndUpdate(
            id,
            {
                role,
            },
            {
                new: true,
            },
        ).select("-password");

        if (!user) {
            throw new NotFoundException("User not found");
        }

        return {
            message: "Role updated successfully",
            user,
        };
    }
}