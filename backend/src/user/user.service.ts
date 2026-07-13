import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,

        private jwtService: JwtService,
    ) { }

    async signup(dto: SignupDto) {

        const user = await this.userModel.findOne({
            email: dto.email,
        });

        if (user) {
            throw new BadRequestException("Email already exists");
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const newUser = await this.userModel.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            role: "USER",
        });

        const token = this.jwtService.sign({
            id: user!._id,
            email: user!.email,
            role: user!.role,
        });

        return {
            message: "Signup Successful",
            token,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        };
    }

    async login(dto: LoginDto) {

        const user = await this.userModel.findOne({
            email: dto.email
        });

        if (!user) {
            throw new UnauthorizedException("Invalid Email");
        }

        const match = await bcrypt.compare(
            dto.password,
            user.password
        );

        if (!match) {
            throw new UnauthorizedException("Wrong Password");
        }

        const token = this.jwtService.sign({
            id: user._id,
            email: user.email
        });

        return {

            message: "Login Successful",

            token,

            user: {

                _id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        }
    }
}