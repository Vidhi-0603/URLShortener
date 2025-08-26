import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
    avatar: {
        type: String,
        default: function () {
            return getGravatarUrl(this.email);
        }
    }
})

function getGravatarUrl(email, size = 200) {
  const hash = crypto.createHash("md5").update(email.trim().toLowerCase()).digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}

const userModel = mongoose.model('User', userSchema);

export default userModel;