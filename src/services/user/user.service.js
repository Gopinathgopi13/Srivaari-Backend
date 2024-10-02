import { prisma } from "../../utils/prisma.js";
import logger from "../../loaders/logger.js";
import {
  comparePassword,
  generateOTP,
  generateTokens,
  hashedPassword,
} from "../../utils/constants.js";
import { mailTemplate, sendEmail } from "../../utils/mailHandler.js";

export const CreateUserService = async (data) => {
  const {
    first_name,
    last_name,
    userName,
    email,
    password,
    mobile_number,
    gender,
    dob,
    roleName = "user",
  } = data;
  try {
    const exisitingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (exisitingUser) {
      throw "This email is already exists.";
    }
    let role;
    if (roleName) {
      try {
        role = await prisma.role.findFirst({
          where: {
            role_name: roleName,
          },
        });
      } catch (error) {
        console.log("Error finding role:", role);
      }
    }

    const hashPassword = await hashedPassword(password);

    const generatedOTP = generateOTP();

    const createUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        userName,
        email,
        token: "",
        mobile_number,
        gender,
        dob,
        otp: generatedOTP,
        password: hashPassword,
        UserRole: {
          create: {
            role_id: role.role_id,
          },
        },
      },
    });
    logger.info("User Created Successfully!.");

    const mailOption = {
      email: email,
      subject: "Account Verification",
      message: mailTemplate(
        "Click the link below to verify your email:",
        `http://localhost:3000/confirm-user?token=${createUser?.otp}`,
        "Verify now"
      ),
    };
    await sendEmail(mailOption);

    return {
      response: { ...createUser },
      message: "Please check your email and activate your account",
    };
  } catch (error) {
    throw error;
  }
};

export const verifyUserService = async (data) => {
  const { email, otp } = data;
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const isUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      console.log(isUser, "------> IsUser");

      if (!isUser) {
        throw new Error("User not found");
      }
      if (isUser.otp !== otp) {
        throw new Error("Invalid OTP");
      }

      const response = await prisma.user.update({
        where: {
          email: isUser.email,
        },
        data: {
          otp: 0,
          isActive: true,
        },
      });
      return response;
    });
    return result;
  } catch (error) {
    console.log(error, "-----> error");
    throw error;
  }
};

export const LoginService = async (data) => {
  const { email, password } = data;
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        include: {
          address: true,
        },
      });
      if (!user) {
        throw new Error("User not found. Do Signup");
      }
      // if (user && !user.isActive) {
      //   throw new Error("Verify your account");
      // }
      await comparePassword(password, user.password);
      const { accessToken } = generateTokens({
        username: user.userName,
        email: user.email,
      });
      const updateToken = await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          token: accessToken,
        },
      });
      console.log(updateToken, "accessToken");
      const userRoles = await prisma.user.findUnique({
        where: {
          user_id: user.user_id,
        },
        select: {
          UserRole: {
            select: {
              role: {
                select: {
                  role_name: true,
                },
              },
            },
          },
        },
      });
      const roleNames =
        userRoles?.UserRole.map((userRole) => userRole.role) || [];
      return { user: updateToken, token: accessToken, role: roleNames };
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const forgotPasswordService = async (data) => {
  const { email } = data;
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const isUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!isUser) {
        throw new Error("User not found");
      }

      const generatedOTP = generateOTP();

      let user = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          otp: generatedOTP,
        },
      });

      const mailOption = {
        email: email,
        subject: "Reset Password link and OTP",
        message: mailTemplate(
          "Click the link below to reset your password:",
          `http://localhost:3000/confirm-user?token=${user?.otp}`,
          "Verify now"
        ),
      };
      await sendEmail(mailOption);

      return { response: { ...user }, messgae: "Reset link send successfully" };
    });
    return result;
  } catch (error) {
    throw error;
  }
};
export const resetPasswordService = async (data) => {
  const { email, password, otp } = data;
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const isUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!isUser) {
        throw new Error("User not found");
      }

      let user = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          password: password,
          otp: 0,
        },
      });

      return user;
    });
    return result;
  } catch (error) {
    throw error;
  }
};
