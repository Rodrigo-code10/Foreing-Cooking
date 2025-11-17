db = db.getSiblingDB('ForeingCooking');

db.usuarios.insertOne({
    nombre: "Administrador",
    email: "admin@foreigncooking.com",
    passwordHash: "$2a$10$oKmrrybz5BJSJiN7qSfxdeBmDfaHAbJTkRaQmXNfZgiNYrWfzVfaW", 
    rol: "admin",
    foto: "/default/admin.png",
    fechaRegistro: new Date()
});
  