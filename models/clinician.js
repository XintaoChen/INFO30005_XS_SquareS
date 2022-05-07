const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const clinicianSchema = new mongoose.Schema(
    {
        emailAddress: { type: String, required: true, unique: true },
        password: { type: String, required: true, unique: true },
        nameFamily: { type: String, required: true },
        nameGiven: { type: String, required: true },
        clinicNumber: String,
        clinicAddress: String,
        profilePhoto: Buffer,
        briefTextBio: String,
    },
    { versionKey: false }
)

// Password comparison function
// Compares the provided password with the stored password
// Allows us to call user.verifyPassword on any returned objects 
clinicianSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, valid) => {
        callback(err, valid)
    })
}
// Password salt factor
const SALT_FACTOR = 10
console.log(bcrypt.hash('zmfltm38975564', 10))
// Hash password before saving
clinicianSchema.pre('save', function save(next) {
    const user = this
    // Go to next if password field has not been modified 
    if (!user.isModified('password')) {
        return next()
    }
    // Automatically generate salt, and calculate hash
    bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
        if (err) {
            return next(err)
        }
        // Replace password with hash
        user.password = hash
        next()
    })
})

const Clinician = mongoose.model('Clinician', clinicianSchema, 'Clinician')
module.exports = Clinician
