const { Pool } = require("pg");
require("dotenv").config();
const nodemailer = require('nodemailer');

const pool = new Pool({
    user: `${process.env.USER}`,
    host: `${process.env.HOST}`,
    port: process.DATABASEPORT,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`,
});

const newUser = async (values) => {
    const query = {
        text: `INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *`,
        values,
    };
    const result = await pool.query(query);
    return result.rows;
}

const getId = async (values) => {
    const query = {
        text: 'select * from usuarios where email = $1 and password=$2',
        values,
    }
    const result = await pool.query(query);
    return result.rows[0];
}

const newSpend = async (values) => {
    const query = {
        text: "insert into gastos (id_usuario,categoria, fecha, mes, descripcion, monto) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
        values,
    };
    const result = await pool.query(query);
    return result.rows;
};

const spentByCategory = async (values) => {
    const query = {
        text: `select categoria, sum(monto) as total from gastos where id_usuario=$1 and mes=$2 group by categoria order by total`,
        values,
    };
    const result = await pool.query(query);
    return result.rows;
};

const spentByDate = async (id) => {
    const query = {
        text: `SELECT * FROM gastos where id_usuario=$1 order by fecha desc`,
        values: [id],
    };
    const result = await pool.query(query);
    return result.rows;
};

const spentMonth = async (values) => {
    const query = {
        text: `
        SELECT
        (select sum(monto) as ingresos FROM gastos where id_usuario=$1 and mes=$2 and categoria = 'Ingresos'),
        (select sum(monto) as gastos FROM gastos where id_usuario=$1 and mes=$2 and categoria <> 'Ingresos'),
        (select sum(monto) as ingresos FROM gastos where id_usuario=$1 and mes=$2 and categoria = 'Ingresos')
        - (select sum(monto) as gastos FROM gastos where id_usuario=$1 and mes=$2 and categoria <> 'Ingresos')
        as saldo`,
        values,
    };
    const result = await pool.query(query);
    return result.rows;
};

const deleteSpend = async (id) => {
    const query = {
        text: `DELETE FROM gastos WHERE id = $1 RETURNING *`,
        values: [id],
    };
    const result = await pool.query(query);
    return result.rowCount;
};

const updateSpend = async (values) => {
    const query = {
        text: `UPDATE gastos SET categoria = $1, fecha = $2, descripcion = $3, monto = $4 WHERE id = $5 RETURNING *`,
        values,
    };
    const result = await pool.query(query);
    return result.rowCount;
};

const getById = async (id) => {
    const query = {
        text: `SELECT * FROM gastos WHERE id = $1`,
        values: [id],
    };
    const result = await pool.query(query);
    return result.rows[0];
}

const deleteUser = async (values) => {
    const query = {
        text: `DELETE FROM usuarios WHERE email = $1 and password = $2 RETURNING *`,
        values,
    };
    const result = await pool.query(query);
    return result.rowCount;
}

const getUserById = async (id) => {
    const query = {
        text: `SELECT * FROM usuarios WHERE id = $1`,
        values: [id],
    };
    const result = await pool.query(query);
    return result.rows[0];
}

const updateUser = async (values) => {
    const query = {
        text: `UPDATE usuarios SET nombre = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`,
        values,
    };
    const result = await pool.query(query);
    return result.rowCount;
}

const getUserByEmail = async (email) => {
    const query = {
        text: `SELECT * FROM usuarios WHERE email = $1`,
        values: [email],
    };
    const result = await pool.query(query);
    return result.rows[0];
}

const sendMail = async (nombre, email, password) => {
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: `${process.env.USERMAIL}`,
            pass: `${process.env.PASSMAIL}`,
        }
    });
    const template = `
    <h3>Hola ${nombre}</h3>
    <p>Como lo solicitaste, tu contraseña es: ${password}</p>
    <p>Para iniciar sesión, ingresa a la siguiente dirección: <a href="https://control-gastos-v2.herokuapp.com/login">Control de gastos</a></p>
    <p>Saludos,</p>
    <p>El equipo de Gastos</p>
    <p>Este correo fue enviado automáticamente, por favor no responder.</p>
    `;

    const mailOptions = {
        from: 'app.gastosv2@gmail.com',
        to: `${email}`,
        subject: 'Contraseña recuperada',
        html: template,
    };

    try {
        const resultado = await transport.sendMail(mailOptions)
        return resultado;
    }
    catch (e) {
        throw e;
    }
};

module.exports = {
    newUser,
    getId,
    newSpend,
    spentByCategory,
    spentByDate,
    spentMonth,
    deleteSpend,
    updateSpend,
    getById,
    deleteUser,
    getUserById,
    updateUser,
    getUserByEmail,
    sendMail,
};
