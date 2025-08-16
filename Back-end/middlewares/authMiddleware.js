import { AUTH_COOKIE_NAME } from "../constants.js";
import jwt from '../lib/jwt.js'

const JWT_SECRET = "622das55asd2185gfg1dhf54gfh5";

export const authMiddlewate = async (req, res, next)=>{
    const token = req.cookies[AUTH_COOKIE_NAME];

        if(!token){
          
          return next();
        }

        try {
           
            const decodedToken =  await jwt.verify(token, JWT_SECRET);

            req.user= decodedToken;
            req.isAuthenticated = true;

            res.locals.user = decodedToken;
            res.locals.isAuthenticated = true;
            next();

        } catch (error) {

            res.clearCookie(AUTH_COOKIE_NAME);
            return res.redirect('/login');
        };

};

export const isAuth = (req, res, next) =>{
    if(!req.user){
       return res.redirect('/login');
    }
    next();
}

export const isGuest = (req, res, next) =>{
    if(req.user){
        return res.redirect('home/404')
    };
    next();
};