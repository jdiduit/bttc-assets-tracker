import { z } from "zod";
import {loginSchema, registerSchema} from "../validations/auth.validation";

export type LoginPayloadRequest = z.infer<typeof loginSchema>
export type RegisterPayloadRequest = z.infer<typeof registerSchema>