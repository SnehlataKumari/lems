import * as mongoose from 'mongoose';

/**
 * A file has following structure.
 * estination: "/home/it/Documents/practice/lems/lems-academy-backend/static/uploads"
encoding: "7bit"
fieldname: "resumeFile"
filename: "Screenshot from 2020-09-02 03-19-30.png"
mimetype: "image/png"
originalname: "Screenshot from 2020-09-02 03-19-30.png"
path: "/home/it/Documents/practice/lems/lems-academy-backend/static/uploads/Screenshot from 2020-09-02 03-19-30.png"
size: 88776
 */

export const StudentSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'User',
			required: true,
		},
		preferedLanguage: String,
		isThisParentLogin: Boolean,
		education: {
			board: String,
			grade: String,
			targetExam: String,
			school: String,
		},
		guardians: [
			{
				guardianType: String,
				firstName: String,
				lastName: String,
				mobileNumber: String,
				email: String,
			}
		],

		address: {
			streetAddress: String,
			streetAddress2: String,
			city: String,
			state: String,
			country: String,
			pincode: String,
		},

		studentActivities: {
			interest: String,
			pastPerformances: String,
			schoolActivities: String,
			strengths: String,
		}

	},
	{
		timestamps: true,
	},
);
