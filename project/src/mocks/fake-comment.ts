import {
  name,
  datatype,
  internet
} from 'faker';
import { Comment } from '../types/comments';

export const makeFakeComment = (): Comment => ({
  id: datatype.number(100),
  user: {
    id: datatype.number(50),
    name: name.title(),
    isPro: datatype.boolean(),
    avatarUrl: internet.avatar(),
  },
  rating: datatype.number(5),
  comment: name.title(),
  date: datatype.string(20),
} as Comment);
