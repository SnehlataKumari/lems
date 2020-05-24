import { UserSchema } from "./user.schema";
import { ClassSchema } from "./class.schema";
import { VideoSchema } from "./video.schema";

export default  [
  { name: 'Class', schema: ClassSchema },
  { name: 'User', schema: UserSchema },
  { name: 'Video', schema: VideoSchema }
];
