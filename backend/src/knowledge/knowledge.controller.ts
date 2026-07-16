import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from "@nestjs/common";
import { KnowledgeService } from "./knowledge.service";
import { CreateKnowledgeDto } from "./dto/create-knowledge.dto";
import { UpdateKnowledgeDto } from "./dto/update-knowledge.dto";

@Controller("knowledge")
export class KnowledgeController {
    constructor(
        private readonly knowledgeService: KnowledgeService,
    ) { }

    // Create Knowledge
    @Post("create")
    create(
        @Body()
        body: CreateKnowledgeDto & {
            createdBy: string;
        },
    ) {
        return this.knowledgeService.create(
            body,
            body.createdBy,
        );
    }

    // Get All Knowledge
    @Get("all")
    findAll() {
        return this.knowledgeService.findAll();
    }

    // Search Knowledge
    @Get("search")
    search(
        @Query("keyword") keyword: string,
    ) {
        return this.knowledgeService.search(
            keyword,
        );
    }

    // Get Knowledge By Id
    @Get(":id")
    findOne(
        @Param("id") id: string,
    ) {
        return this.knowledgeService.findOne(id);
    }

    // Update Knowledge
    @Patch("update/:id")
    update(
        @Param("id") id: string,
        @Body()
        body: UpdateKnowledgeDto & {
            updatedBy: string;
        },
    ) {
        return this.knowledgeService.update(
            id,
            body,
            body.updatedBy,
        );
    }

    // Delete Knowledge
    @Delete("delete/:id")
    remove(
        @Param("id") id: string,
    ) {
        return this.knowledgeService.remove(id);
    }
}