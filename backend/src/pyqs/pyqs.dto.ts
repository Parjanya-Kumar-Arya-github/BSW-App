import { IsString } from "class-validator";

export class PyqsDTO {
  @IsString()
  dept: string;     // AML, AMP, APL

  @IsString()
  course: string;   // AML702, AMP100

  @IsString()
  type: string;     // major, minor1, minor2, quiz, etc.
}
