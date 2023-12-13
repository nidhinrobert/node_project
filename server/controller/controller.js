var Userdb = require("../model/model");
const path = require("path");
const multer = require("multer");
const { error } = require("console");

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "avatars");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

// Multer upload configuration
const upload = multer({ storage: storage }).single("avatar");

// create and save new employee
exports.create = (req, res) => {
    console.log("init file", req.files);
    upload(req, res, async (error) => {
        if (error instanceof multer.MulterError) {
            console.log("init avatar", req.body.avatar);
            return res.status(400).json({ error: "image error" + error });
        } else if (error) {
            return res.status(500).json({ error: "server error " + error });
        } else {
            console.log("val");
            // Validate required fields
            const requiredFields = [
                "salutation",
                "firstName",
                "lastName",
                "email",
                "phone",
                "dob",
                "gender",
                "qualifications",
                "address",
                "city",
                "pincode",
                "state",
                "country",
                "username",
                "password",
            ];

            for (const field of requiredFields) {
                if (!req.body[field]) {
                    return res
                        .status(400)
                        .send({ message: `Error: Missing ${field} field` });
                }
            }

            console.log("Received Data:", req.body);
            console.log("Received File:", req.file);

            const avatarPath = req.file ? req.file.path : null;
            console.log(avatarPath);

            // new employee

            const user = new Userdb({
                salutation: req.body.salutation,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                gender: req.body.gender,
                dob: req.body.dob,
                country: req.body.country,
                address: req.body.address,
                qualifications: req.body.qualifications,
                state: req.body.state,
                city: req.body.city,
                pincode: req.body.pincode,
                username: req.body.username,
                password: req.body.password,
                avatar: avatarPath,
            });

            // save employee in database
            user
                .save(user)
                .then((data) => {
                    res.send(data);
                })
                .catch((err) => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occured during create operation",
                    });
                });
        }
    });
};

//retrieve and retrieve all employee user and return single user
exports.find = (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;    
    const skip = (page - 1)*limit;
    console.log(skip);

    if (req.query.id) {
        const id = req.query.id;

        Userdb.findById(id)
    
            .then((data) => {
                if (!data) {
                    res.status(404).send({ message: "NOt found user with" + id });
                }
                 else {
                    res.send(data)
                }
            })
            .catch(_err => {
                res.status(500).send({ message: "Error user" });
            })
    }
     else {
        Userdb.countDocuments().exec()
            .then(totalCount =>{
        Userdb.find()
            .then((data) => {
                data.reverse();

                const slicedData = data.slice(skip, skip + limit);
                res.status(200).json({
                    message: "ok",
                    length: totalCount,
                    data: slicedData,
                });
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Error occurd while retrieving user information"
                });
            });
    });
  }
};


//update the employee User id
exports.update = (req, res) => {

    upload(req, res, async (error) => {

        if (error instanceof multer.MulterError) {
            res.status(400).json({ err: "image upload error" })
        }
        else if (error) {
            res.status(500).json({ error: "server error" })
        }
        

        let avatarPath;
        if (req.file) {
            avatarPath = path.join('avatars', req.file.filename);
        } else {
            // If no new file is uploaded, keep the existing avatar path
            const emp = await Userdb.findById(req.params.id);
            if (!emp) {
                res.status(404).json({ error: "employee not found" });
                return;
            }
            avatarPath = emp.avatar; // Use the existing avatar path
        }

        const emp = await Userdb.findById(req.params.id);
        if (!emp) {
            res.status(404);
            throw new Error("employee not found")
        }

        // Update avatar only if a new file was uploaded
        const updateData = {
            ...req.body,
            ...(avatarPath ? { avatar: avatarPath } : {}), // Conditionally include avatar field
        };

        console.log(avatarPath)
        const upd = await Userdb.findByIdAndUpdate(req.params.id, updateData, { new: true });
        console.log(upd)
        res.status(200).json(upd);
    })
};


// search method

exports.search = (req, res) => {
    const query = req.query.q.toString();
    console.log(query);
    Userdb.find({
        $or: [
            { firstName: { $regex: new RegExp(query, "i") } },
            { lastName: { $regex: new RegExp(query, "i") } },
            { email: { $regex: new RegExp(query, "i") } },
        ],
    }).exec()
        .then(items => {
            res.json({
                data: items.reverse(),
                length: items.length,
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        });
};




//deleting the employee
exports.delete = async (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
        res.status(404).send({message:'Cannot Delete with id ${id}.May be id is wrong'})
        }else{
            res.send({
                message:"User was deleted successfully"
            })
        }      
    })
    .catch(err=>{
        res.status(500).sned({
            message:"Could not delete User with id="+id
        })
    });
}
