import {
    ArrayUnique,
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
} from "class-validator";

export class CreateKnowledgeDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    category: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    department: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsString({ each: true })
    tags?: string[];

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsString({ each: true })
    attachments?: string[];

    @IsOptional()
    @IsEnum(["ACTIVE", "INACTIVE"])
    status?: string;
}