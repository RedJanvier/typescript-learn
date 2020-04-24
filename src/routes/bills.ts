// import { Router } from "express";
interface Controllers {
  test: (req: Request, res: Response) => Response;
  listBills: (req: Request, res: Response) => Promise<any>;
  // listUsers: (req: Request<...>, res: Response <...>) => Promise <...>;
  // createUser: (req: Request<...>, res: Response <...>) => ...;
}
const router = (r: object, controllers: Controllers) => {
  (<any>router).route("/").get(controllers.test);

  return router;
};

export default router;
