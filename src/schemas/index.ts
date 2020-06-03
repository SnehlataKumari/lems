import { UserSchema } from "./user.schema";
import { ClassSchema } from "./class.schema";
import { AssetSchema } from "./asset.schema";
import { ChapterSchema } from "./chapter.schema";
import { SubjectSchema } from "./subject.schema";

export default  [
  { name: 'Class', schema: ClassSchema },
  { name: 'User', schema: UserSchema },
  { name: 'Asset', schema: AssetSchema },
  { name: 'Chapter', schema: ChapterSchema },
  { name: 'Subject', schema: SubjectSchema }
];
