db = db.getSiblingDB('ForeingCooking');

db.usuarios.insertOne({
    nombre: "Administrador",
    email: "admin@foreigncooking.com",
    passwordHash: "$2a$10$oKmrrybz5BJSJiN7qSfxdeBmDfaHAbJTkRaQmXNfZgiNYrWfzVfaW", 
    rol: "admin",
    foto: "https://res.cloudinary.com/ddnarqecz/image/upload/v1764514329/admin_a124ec.png",
    fechaRegistro: new Date()
});
  