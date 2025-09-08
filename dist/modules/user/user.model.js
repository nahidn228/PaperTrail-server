"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        min: 3,
        max: 255,
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
        sparse: true,
        // required: [true, "Your Phone number is not valid"],
        validate: {
            validator: function (value) {
                if (!value)
                    return true;
                return /^(?:\+88|88)?01[3-9]\d{8}$/.test(value);
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
        unique: [true, "This Phone already exist"],
    },
    password: {
        type: String,
        required: true,
        // validate: {
        //   validator: function (value) {
        //     return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        //       value
        //     );
        //   },
        //   message: (props) =>
        //     `${props.value} is too week. Use At least 1 uppercase (A-Z), 1 lowercase letter (a-z), 1 digit (0-9), 1 special character (@ $ ! % * ? &) and Minimum 8 characters`,
        // },
    },
    role: {
        type: String,
        enum: {
            values: ["User", "Admin", "Agent"],
            message: "{VALUE} is not acceptable",
        },
        required: true,
    },
    profilePicture: {
        type: String,
    },
    nid: {
        type: String,
    },
    address: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true, versionKey: false });
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
