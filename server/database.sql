create table usuarios (
    id serial primary key,
    nombre varchar(50) unique not null,
    email varchar(50) unique not null,
    password varchar(50) not null
);

create table gastos (
    id serial primary key,
    id_usuario int not null,
    categoria varchar(50) not null,
    fecha date,
    mes varchar (15) not null,
    descripcion varchar(30) not null,
    monto int not null default 0
);

alter table
    gastos
add
    foreign key (id_usuario) references usuarios(id) on delete cascade