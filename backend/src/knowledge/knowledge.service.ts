import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";

import {
    Knowledge,
    KnowledgeDocument,
} from "./schemas/knowledge.schema";

import { CreateKnowledgeDto } from "./dto/create-knowledge.dto";
import { UpdateKnowledgeDto } from "./dto/update-knowledge.dto";

@Injectable()
export class KnowledgeService {
    constructor(
        @InjectModel(Knowledge.name)
        private readonly knowledgeModel: Model<KnowledgeDocument>,
    ) { }

    // Create Knowledge
    async create(
        dto: CreateKnowledgeDto,
        createdBy: string,
    ) {
        const knowledge = await this.knowledgeModel.create({
            ...dto,
            createdBy,
            updatedBy: createdBy,
        });

        return {
            message: "Knowledge created successfully",
            data: knowledge,
        };
    }

    // Get All Knowledge
    async findAll() {
        const knowledge = await this.knowledgeModel
            .find()
            .populate("createdBy", "name email")
            .populate("updatedBy", "name email")
            .sort({ createdAt: -1 });

        return {
            count: knowledge.length,
            data: knowledge,
        };
    }

    // Get Knowledge By Id
    async findOne(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException(
                "Invalid Knowledge ID",
            );
        }

        const knowledge = await this.knowledgeModel
            .findById(id)
            .populate("createdBy", "name email")
            .populate("updatedBy", "name email");

        if (!knowledge) {
            throw new NotFoundException(
                "Knowledge not found",
            );
        }

        return knowledge;
    }

    // Update Knowledge
    async update(
        id: string,
        dto: UpdateKnowledgeDto,
        updatedBy: string,
    ) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException(
                "Invalid Knowledge ID",
            );
        }

        const knowledge =
            await this.knowledgeModel.findByIdAndUpdate(
                id,
                {
                    ...dto,
                    updatedBy,
                },
                {
                    new: true,
                },
            );

        if (!knowledge) {
            throw new NotFoundException(
                "Knowledge not found",
            );
        }

        return {
            message: "Knowledge updated successfully",
            data: knowledge,
        };
    }

    // Delete Knowledge
    async remove(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException(
                "Invalid Knowledge ID",
            );
        }

        const knowledge =
            await this.knowledgeModel.findByIdAndDelete(id);

        if (!knowledge) {
            throw new NotFoundException(
                "Knowledge not found",
            );
        }

        return {
            message: "Knowledge deleted successfully",
        };
    }

    // Search Knowledge (Useful for AI later)
    async search(keyword: string) {
        const knowledge = await this.knowledgeModel.find({
            $or: [
                {
                    title: {
                        $regex: keyword,
                        $options: "i",
                    },
                },
                {
                    content: {
                        $regex: keyword,
                        $options: "i",
                    },
                },
                {
                    tags: {
                        $elemMatch: {
                            $regex: keyword,
                            $options: "i",
                        },
                    },
                },
            ],
        });

        return {
            count: knowledge.length,
            data: knowledge,
        };
    }
}