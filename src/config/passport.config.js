import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import UserManager from "../managers/user.manager.js";

const userManager = new UserManager();

export const config = (server) => {
    // Opciones para la estrategia JWT basada en el encabezado Authorization
    const jwtHeaderOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY,
    };

    // Opciones para la estrategia JWT basada en una cookie llamada "token"
    const jwtCookieOptions = {
        jwtFromRequest: (req) => req.cookies ? req.cookies["token"] : null,
        secretOrKey: process.env.SECRET_KEY,
    };

    // Función que maneja el inicio de sesión
    const handleLogin = async (payload, done) => {
        try {
            const userFound = await userManager.getOneById(payload.id);
            return done(null, userFound);
        } catch (error) {
            return done(null, false, { message: error.message });
        }
    };

    // Configura las estrategias JWT para Passport
    passport.use("jwt-header", new JwtStrategy(jwtHeaderOptions, handleLogin));
    passport.use("jwt-cookie", new JwtStrategy(jwtCookieOptions, handleLogin));

    // Inicializa Passport en el servidor
    server.use(passport.initialize());
};