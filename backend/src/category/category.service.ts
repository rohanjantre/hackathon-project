import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import {
    Category,
    CategoryDocument,
} from "./schemas/category.schema";

import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
    constructor(
        @InjectModel(Category.name)
        private readonly categoryModel: Model<CategoryDocument>,
    ) { }

    // Create Category
    async create(dto: CreateCategoryDto) {
        const categoryExists = await this.categoryModel.findOne({
            name: dto.name,
        });

        if (categoryExists) {
            throw new BadRequestException(
                "Category already exists",
            );
        }

        const category = await this.categoryModel.create(dto);

        return {
            message: "Category created successfully",
            data: category,
        };
    }

    // Get All Categories
    async findAll() {
        const categories = await this.categoryModel
            .find()
            .sort({ createdAt: -1 });

        return {
            count: categories.length,
            data: categories,
        };
    }

    // Get Category By Id
    async findOne(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException(
                "Invalid Category ID",
            );
        }

        const category = await this.categoryModel.findById(id);

        if (!category) {
            throw new NotFoundException(
                "Category not found",
            );
        }

        return category;
    }

    // Update Category
    async update(
        id: string,
        dto: UpdateCategoryDto,
    ) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException(
                "Invalid Category ID",
            );
        }

        if (dto.name) {
            const categoryExists =
                await this.categoryModel.findOne({
                    name: dto.name,
                    _id: { $ne: id },
                });

            if (categoryExists) {
                throw new BadRequestException(
                    "Category name already exists",
                );
            }
        }

        const category =
            await this.categoryModel.findByIdAndUpdate(
                id,
                dto,
                {
                    new: true,
                },
            );

        if (!category) {
            throw new NotFoundException(
                "Category not found",
            );
        }

        return {
            message: "Category updated successfully",
            data: category,
        };
    }

    // Delete Category
    async remove(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException(
                "Invalid Category ID",
            );
        }

        const category =
            await this.categoryModel.findByIdAndDelete(id);

        if (!category) {
            throw new NotFoundException(
                "Category not found",
            );
        }

        return {
            message: "Category deleted successfully",
        };
    }
}