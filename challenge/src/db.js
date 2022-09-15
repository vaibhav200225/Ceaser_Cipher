const { Sequelize, DataTypes } = require("sequelize");
const fsp = require("fs/promises");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const ooparts = require("./ooparts.js");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "ooparts.db",
    logging: false
});

const User = sequelize.define("User", {
    user: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    pass: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accessLevel: {
        type: Sequelize.ENUM,
        defaultValue: "researcher",
        values: ["researcher", "overseer"]
    }
});

const OOPArt = sequelize.define("OOPArt", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: () => crypto.randomBytes(4).toString("hex")
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accessLevel: {
        type: Sequelize.ENUM,
        defaultValue: "guest",
        values: ["guest", "researcher", "overseer"]
    }
});

let password = crypto.randomBytes(32).toString("hex");
console.log(`password: ${password}`);

(async () => {
    await sequelize.sync({ force: true });

    await User.create({
        user: "The Overseer",
        pass: bcrypt.hashSync(password, 12),
        accessLevel: "overseer"
    });

    for(let oopart of ooparts) {
        await OOPArt.create(oopart);
    }

    let flag;
    try {
        flag = (await fsp.readFile("/flag.txt")).toString();
    } 
    catch(err) {
        flag = "HTB{test_flag}";
    }

    await OOPArt.create({
        name: "???",
        desc: crypto.randomBytes(512).toString("hex") 
                + flag
                + crypto.randomBytes(512).toString("hex"),
        accessLevel: "overseer"
    });
})();

module.exports = { sequelize, User, OOPArt, password };