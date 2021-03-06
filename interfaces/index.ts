// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: string;
  name: string;
  profileImage: string;
  bio: string;
  email: string;
  _id: string;
};

export type Crumb = {
  title: string;
  link: string;
};

export type Post = {
  _id: string;
  creatorId: string;
  content: string;
};
