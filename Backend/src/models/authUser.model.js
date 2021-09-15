const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: false },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
});

userSchema.methods.checkPassword = function (password) {
    return new Promise(function (resolve, reject) {
        bcrypt.compare(password, this.password, function (err, same) {
            if (err) {
                return reject(err);
            }
            return resolve(same);
        });
    });
};

const User = mongoose.model("user", userSchema);
module.exports = User;
