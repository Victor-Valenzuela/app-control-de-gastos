//En este archivo se exportan las funciones(desde el archivo db que contiene las query para la base de datos) que se van a usar en el controlador. Aqui creo que se traba con el req.body y los try y catch en para manejar los errores y enviarlos a la vista.
const { newUser, getId, newSpend, spentByCategory, spentByDate, spentMonth, deleteSpend, updateSpend, getById, deleteUser, getUserById, updateUser, getUserByEmail, sendMail, } = require('../database/db');
const jwt = require('jsonwebtoken');
const secretKey = 'secretKey';
const moment = require('moment');
const date = moment().locale("es-mx").format('MMMM');

const verification = async (req, res, _next) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secretKey, (err, _decoded) => {
            if (err) {
                res.send(false);
            } else {
                res.send(true);
            }
        });
    } else {
        res.send(false);
    }
}

const register = async (req, res, next) => {
    const { nombre, email, password } = req.body;
    try {
        const result = await newUser([nombre, email, password]);
        res.send(result);
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await getId([email, password]);
        if (user) {
            const token = jwt.sign({ user }, secretKey);
            res.cookie('token', token);
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (error) {
        next(error);
    }
}

const getByMonth = async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                res.send(false);
            } else {
                const id = decoded.user.id;
                try {
                    const result = await spentMonth([id, date]);
                    res.send(result);
                } catch (error) {
                    next(error);
                }
            }
        })
    }
};

const getByCategory = async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                res.send(false);
            } else {
                const id = decoded.user.id;
                try {
                    const result = await spentByCategory([id, date]);
                    res.send(result);
                } catch (error) {
                    next(error);
                }
            }
        })
    }
}

const getByDate = async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                res.send(false);
            } else {
                const id = decoded.user.id;
                try {
                    const result = await spentByDate(id);
                    res.send(result);
                } catch (error) {
                    next(error);
                }
            }
        })
    }
}

const postNewSpend = async (req, res, next) => {
    const { token } = req.cookies;
    const { categoria, fecha, mes, descripcion, monto } = req.body;
    if (token) {
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                res.send(false);
            } else {
                const id = decoded.user.id;
                try {
                    const result = await newSpend([id, categoria, fecha, mes, descripcion, monto]);
                    res.status(200).send({ result, success: 'Post was successful' });
                } catch (error) {
                    next(error);
                }
            }
        })
    }
}

const getName = async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                res.send(false);
            } else {
                const nombre = decoded.user.nombre;
                const idUser = decoded.user.id;
                const email = decoded.user.email;
                const password = decoded.user.password;
                res.send({ nombre, idUser, email, password });
            }
        });
    }
}

const deleteById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await deleteSpend(id);
        (result === 1)
            ? res.status(200).send({ success: 'Gasto eliminado correctamente' })
            : res.status(404).send({ error: 'Algo salió mal' });
    } catch (error) {
        next(error);
    }
}

const getSpendById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await getById(id);
        (result)
            ? res.status(200).send(result)
            : res.status(404).send({ error: 'Algo salió mal' });
    } catch (error) {
        next(error);
    }
}

const updateById = async (req, res, next) => {
    const { id } = req.params;
    const { categoria, fecha, descripcion, monto } = req.body;
    try {
        const result = await updateSpend([categoria, fecha, descripcion, monto, id]);
        (result === 1)
            ? res.status(200).send({ success: 'Gasto actualizado correctamente' })
            : res.status(404).send({ error: 'Algo salió mal123' });
    } catch (error) {
        next(error);
    }
}

const logOut = async (_req, res,) => {
    try {
        res.clearCookie('token');
        res.send(true);
    } catch (error) {
        res.send(false);
    }
}

const getUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await getUserById(id);
        (result)
            ? res.status(200).send(result)
            : res.status(404).send({ error: 'Algo salió mal' });
    } catch (error) {
        next(error);
    }
}

const updateAccount = async (req, res, next) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;
    try {
        const result = await updateUser([nombre, email, password, id]);
        (result === 1)
            ? res.status(200).send({ success: 'Cuenta actualizada correctamente' })
            : res.status(404).send({ error: 'Algo salió mal' });
    } catch (error) {
        next(error);
    }
}

const deleteAccount = async (req, res, next) => {
    const { email } = req.params;
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                res.send(false);
            } else {
                const password = decoded.user.password;
                try {
                    const result = await deleteUser([email, password]);
                    (result === 1)
                        ? res.clearCookie('token').send(true)
                        : res.status(404).send({ error: 'Algo salió mal' });
                } catch (error) {
                    next(error);
                }
            }
        })
    }
}

const recoverPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
        const result = await getUserByEmail(email);
        if (result) {
            await sendMail(result.nombre, result.email, result.password);
            res.status(200).send({ success: 'Se ha enviado un correo con la contraseña' });
        } else {
            res.status(404).send({ error: 'El correo no existe en la base de datos' });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    verification,
    register,
    login,
    getName,
    getByMonth,
    getByCategory,
    getByDate,
    postNewSpend,
    deleteById,
    getSpendById,
    updateById,
    logOut,
    getUser,
    updateAccount,
    deleteAccount,
    recoverPassword
};