import axios from "axios";
import { https } from "./../config/config";

export const userServ = {
  postLogin: () => {
    return https.post("/auth/signin");
  },
};
