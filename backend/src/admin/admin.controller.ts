import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
} from "@nestjs/common";
import { AdminService } from "./admin.service";

@Controller("admin")
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
    ) { }

    // Get all users
    @Get("users")
    getAllUsers() {
        return this.adminService.getAllUsers();
    }

    // Get single user
    @Get("users/:id")
    getUserById(
        @Param("id") id: string,
    ) {
        return this.adminService.getUserById(id);
    }

    // Delete user
    @Delete("users/:id")
    deleteUser(
        @Param("id") id: string,
    ) {
        return this.adminService.deleteUser(id);
    }

    // Change role
    @Patch("users/:id/role")
    updateRole(
        @Param("id") id: string,
        @Body() body: { role: string },
    ) {
        return this.adminService.updateRole(
            id,
            body.role,
        );
    }
}