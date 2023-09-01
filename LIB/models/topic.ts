import mongoose, {Schema} from "mongoose"
const topicSchema = new Schema(
    {
        title: String,
        description: String,

    },
    {
        timestamps: true
    }
)

const authSchema = new Schema(
    {
        email: String,
        password: String,
        image: String,
        Name: String,
        DOB: String,
        Address: String

       
    }
)


const healthdataSchema = new Schema(
    {
        user: String,
        Diagonisis: String,
        description: String,
        Medicine: String,
        OtherInformation: String,
        date: Date,  
    }
)

const bloodPressureSchema = new Schema(
    {
        user: String,
        description: String,
        highPressure: Number,
        lowerPressure: Number,
        OtherInformation: String,
        date: Date,  
    }
)
const SymptomsSchema = new Schema(
    {
        user: String,
        mainpain: String,
        OtherInformation: String,
        date: Date,  
    }
)

const weightHeightSchema = new Schema(
    {
        user: String,
        weight: Number,
        Height: Number,
        BMI: Number,
        OtherInformation: String,
        date: Date,  
    }
)


const NotificationSchema = new Schema(
    {
        user: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        medicine: {
            type: String,
            required: true,
        },
        notification: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const user = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema)
const Auth  = mongoose.models.Auth || mongoose.model("Auth", authSchema)
const Healthdata = mongoose.models.Healthdata || mongoose.model("Healthdata", healthdataSchema)
const BloodPressure  = mongoose.models.BloodPressure || mongoose.model("BloodPressure", bloodPressureSchema)
const weightHeight  = mongoose.models.weightHeight || mongoose.model("weightHeight", weightHeightSchema)
const symptom  = mongoose.models.symptom || mongoose.model("symptom", SymptomsSchema)
const Notification  = mongoose.models.Notification || mongoose.model("Notification", NotificationSchema)
const User  = mongoose.models.User || mongoose.model("User", user)


export {Topic, User, Auth, Healthdata, BloodPressure, weightHeight, symptom, Notification};
