import { faker } from '@faker-js/faker';

export default function randomUser () {
  const user = {
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    coment: faker.lorem.sentence(),
    profileImage: faker.image.avatar()
  };

  return user;
}
