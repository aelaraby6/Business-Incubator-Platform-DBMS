import { Router } from "express";
import {AuthRouter} from "./auth/auth.js";

const router = Router();

router.use("/auth" , AuthRouter);


export {router as GlobalRouter};