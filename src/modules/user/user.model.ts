import { model, Schema } from "mongoose";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    min: 3,
    max: 8,
  },
  email: {
    type: String,
    required: [true, "User email required"],

    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
    immutable: true,
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Your Phone number is not valid"],
    validate: {
      validator: function (value) {
        return /^(?:\+88|88)?01[3-9]\d{8}$/.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    immutable: true,
    unique: [true, "This Phone already exist"],
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        );
      },
      message: (props) =>
        `${props.value} is too week. Use At least 1 uppercase (A-Z), 1 lowercase letter (a-z), 1 digit (0-9), 1 special character (@ $ ! % * ? &) and Minimum 8 characters`,
    },
  },
  role: {
    type: String,
    enum: {
      values: ["customer", "admin"],
      message: "{VALUE} is not acceptable",
    },
    required: true,
  },
});

const User = model<IUser>("user", userSchema);

export default User;
