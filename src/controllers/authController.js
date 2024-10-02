import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { PrismaClient } from "@prisma/client";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body, "====> Body Data");

  try {
    // Step 1.1: Find the user and include their roles
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        UserRole: {
          include: {
            role: true, // Include the role data (role_name, role_id)
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 1.2: Validate password (compare with hashed password)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Step 1.3: Extract role details
    const userRoles = user.UserRole.map((userRole) => ({
      roleId: userRole.role.role_id,
      roleName: userRole.role.role_name,
    }));

    // Step 1.4: Generate JWT token with userId, roleId, and roleName
    const token = jwt.sign(
      {
        userId: user.user_id,
        roles: userRoles, // Include all roles in the JWT payload
      },
      "your-secret-key", // Replace with your actual secret key
      { expiresIn: "1h" } // Token expiration time
    );

    // Step 1.5: Send the token back to the client
    res.status(200).json({
      message: "Login successful",
      token, // The generated JWT token
      userId: user.user_id, // Optional: Send userId for reference
      roles: userRoles, // Optional: Send user roles for reference
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
