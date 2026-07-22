import {
    ArrayUnique,
    IsArray,
    IsEnum,
    IsOptional,
    IsString,
    MaxLength,
} from "class-validator";

export class UpdateKnowledgeDto {
    @IsOptional()
    @IsString()
    @MaxLength(150)
    title?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    category?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    department?: string;

    @IsOptional()
    @IsString()
    content?: string;

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