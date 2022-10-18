import mongoose from 'mongoose';

type PlaneType = {
    userId: string,
    Registration: string,
    Model: number,
    Vmax: number,
    MountingSpeed: number
    Altitude: number,
    updatedAt: Date,
};

const PlaneSchema = new mongoose.Schema<PlaneType>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    userId: { type: mongoose.ObjectId, required: true },
    Registration: { type: String, required: true },
    Model: { type: String, required: true },
    Vmax: { type: Number, required: true },
    MountingSpeed: { type: Number, required: true },
    Altitude: { type: Number, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: false },
});

exports.PlaneModel = mongoose.model('Plane', PlaneSchema);
