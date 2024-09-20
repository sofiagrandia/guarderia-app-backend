const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
// Configurar JWT
const JWT_SECRET = "tu_super_secreto"; // Este debe estar en una variable de entorno
const JWT_EXPIRES_IN = "90d";

const userController = {
  // Obtener todas los servicios
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener los usuarios",
        error: error.message,
      });
    }
  },

  // Obtener un servicio específico
  getUser: async (req, res) => {
    try {
      const { userId } = req.params;
    
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({
        message: "Error al obtener el usuario",
        error: error.message,
      });
    }
  },
  // Registro de usuario

  register: async (req, res) => {
    try {
      const { name, email, password, mascotas = [], image ='' } = req.body;

      const validMascotas = [];
      const noImage = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
      if (mascotas == null) {
        validMascotas.push("");
      }
      for (const mascota of mascotas) {
        const foundMascota = await Mascota.findById(mascota._id);
        if (!foundMascota) {
          validMascotas.push("");
          return res
            .status(400)
            .json({ message: `Mascota with id ${mascota._id} not found` });
        }
        validMascotas.push(mascota._id);
      }

      const newUser = new User({
        name,
        email,
        password: password,
        mascotas: validMascotas,
        image: noImage,
        //automaticamente son user, a no ser que se ponga manualmente en la BBDD
        role: "user",
      });

      await newUser.save();
      res
        .status(201)
        .send({ message: "Usuario registrado con éxito", userId: newUser._id });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al registrar el usuario",
          error: error.message,
        });
    }
  },

  // Inicio de sesión
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
      });
      res.status(200).json({ message: "Login exitoso", token, id: user._id });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error en el login", error: error.message });
    }
  },

  // Actualizar perfil del usuario
  updateProfile: async (req, res) => {
    console.log("En back");
    console.log("Request Params:", req.params); // Check if correct params are coming
    console.log("Request Body:", req.body);
    try {
      const { userId } = req.params;
      const { _id, name, email, mascotas = [], password, image, role, __v } = req.body;
      const hashedPassword = await bcrypt.hash(password,10);
      console.log(hashedPassword);
      const currentUser = await User.findById(userId);
      let updatedUser = null;
      if(currentUser.password===password){
         updatedUser = await User.findByIdAndUpdate(
          userId,
          { _id, name, email, mascotas, password, image, role, __v },
          { new: true }
        );
      }else{
         updatedUser = await User.findByIdAndUpdate(
          userId,
          { _id, name, email, mascotas, password: hashedPassword, image, role, __v },
          { new: true }
        );
      }
      
      console.log("User ID from request:", userId);
      console.log("Updated data from request body:", { name, email, mascotas, password });

      console.log("updated user back", updatedUser);
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res
        .status(200)
        .json({ message: "Perfil actualizado con éxito", user: updatedUser });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Error al actualizar el perfil",
          error: error.message,
        });
    }
  },

    // Eliminar un servicio
    deleteUser: async (req, res) => {
        try {
          const { userId } = req.params;
          const deletedUser = await User.findByIdAndDelete(userId);
    
          if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
          }
    
          res.status(200).json({ message: "Usuario eliminado con éxito" });
        } catch (error) {
          res.status(500).json({
            message: "Error al eliminar el Usuario",
            error: error.message,
          });
        }
      },
};

module.exports = userController;
