import { Controller, Post, Get, Body, UseGuards, Request, UnauthorizedException, BadRequestException, Param } from "@nestjs/common";
import { UsersService } from "src/services/users.service";
import { AuthService } from "src/services/auth.service";
import { success } from "src/utils";
import { AuthGuard } from "@nestjs/passport";
import { JwtService } from '@nestjs/jwt';
import { SmsService } from "src/services/sms.service";
import { VersionService } from "src/services/version.service";
import { JwtAuthGuard } from "src/passport/auth.guard";
import * as Joi from '@hapi/joi';
import * as bcrypt from 'bcryptjs';
import { UserSchema } from "src/schemas/user.schema";

const passwordExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const schema = Joi.object({
  name: Joi
    .string()
    .trim()
    .min(3)
    .max(30)
    .required(),
  password: Joi
    .string()
    .pattern(passwordExpression)
    .required(),
  email: Joi.string().trim().lowercase().email()
});

@Controller('auth')
export class AuthController {
  constructor(
    private service: AuthService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private smsService: SmsService,
    private versionService: VersionService
  ) {}

  @Post('sign-up')
  async signUp(@Body() req) {

    // Validate email trim, case sensitive(small letter), valid email, password strength validate, encrypt, name trim
    // Step 2: Create a token: To verify email address which we will send to email.

     const { email , password , name } = req;
    let value;

    try {
      value = await schema.validateAsync({ name: name, email: email, password: password  });
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err.message);
    }
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password , salt);
    const user = await this.usersService.create({ email, password:hash, name });
    const users = this.usersService.getPublicDetails(user);
    const verifyEmail = this.jwtService.sign(user.toJSON());
    const link = `http://localhost:3000/auth/verify/${verifyEmail}`;
 
    return {
      link,
      message: "signed up successfully!",
      users
    };
  }

  @Get('verify/:token')
  async verify(@Param('token') token) {
    const user = this.jwtService.verify(token);
    const id = user._id;
    console.log(id,'id');
    
    if(user){
      await this.usersService.findByIdAndUpdate(id, {isEmailVerified: true});
      return `Email <b>${user.email}</b> Verified Successfully`;
    }
    
  }



  @Post('login')
  async login(@Body() user) {
    const data = await this.service.login(user);
    return success('logged in successfully!' , data.email);
  }
}
