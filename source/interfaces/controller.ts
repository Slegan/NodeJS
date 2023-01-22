import { Router } from "express";
import { ValidatedRequestSchema } from 'express-joi-validation';

interface Controller {
  path: string;
  router: Router;
}

export default Controller;
