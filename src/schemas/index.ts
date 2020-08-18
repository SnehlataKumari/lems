import { UserSchema } from './user.schema';
import { ClassSchema } from './class.schema';
import { AssetSchema } from './asset.schema';
import { ChapterSchema } from './chapter.schema';
import { SubjectSchema } from './subject.schema';
import { VersionSchema } from './version.schema';
import { TokenSchema } from './token.schema';
import { TeacherSchema } from './teacher.schema';
import { ProductSchema } from "./product.schema";
import { CourseSchema } from './course.schema';
import { LiveStreamSchema } from './liveStream.schema';

export default [
  { name: 'Class', schema: ClassSchema },
  { name: 'User', schema: UserSchema },
  { name: 'Asset', schema: AssetSchema },
  { name: 'Chapter', schema: ChapterSchema },
  { name: 'Subject', schema: SubjectSchema },
  { name: 'Version', schema: VersionSchema },
  { name: 'Token', schema: TokenSchema },
  { name: 'Teacher', schema: TeacherSchema },
  { name: 'Product', schema: ProductSchema},
  { name: 'Course', schema: CourseSchema },
  { name: 'LiveStream', schema: LiveStreamSchema},
];