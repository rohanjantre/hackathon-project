import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";

import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller("category")
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService,
    ) { }

    // Create Category
    @Post("create")
    create(
        @Body() dto: CreateCategoryDto,
    ) {
        return this.categoryService.create(dto);
    }

    // Get All Categories
    @Get("all")
    findAll() {
        return this.categoryService.findAll();
    }

    // Get Category By Id
    @Get(":id")
    findOne(
        @Param("id") id: string,
    ) {
        return this.categoryService.findOne(id);
    }

    // Update Category
    @Patch("update/:id")
    update(
        @Param("id") id: string,
        @Body() dto: UpdateCategoryDto,
    ) {
        return this.categoryService.update(
            id,
            dto,
        );
    }

    // Delete Category
    @Delete("delete/:id")
    remove(
        @Param("id") id: string,
    ) {
        return this.categoryService.remove(id);
    }
}