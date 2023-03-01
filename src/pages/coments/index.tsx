import { NextPage } from 'next';
import Layout from '../../components/layout';
import { trpc } from '../../utils/trpc';
import randomUser from '../../utils/randomUser';
import { useState } from 'react';
import { User } from '@prisma/client';
import ParseDate from '../../utils/parseDate';

const Coments:NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  trpc.useQuery(['users.getAllUsers'], {
    onSuccess: (data) => setUsers(data)
  });

  const { mutate: addUser } = trpc.useMutation(['users.addUser'], {
    onSuccess: (user) => setUsers((prev) => [...prev, user])
  });

  const handleClick = () => {
    const user = randomUser();
    addUser(user);
  };
  return (
    <Layout>
      <div className='flex justify-between'>
        <ul className='py-3'>
          {
            users.map(user => (
              <li key={user.id} className='flex items-center justify-between py-2'>
                <div className='flex items-center'>
                  <img src={user.profileImage} alt={user.name} className='w-[58px] rounded-full border-2 border-gray-300 p-1' />
                  <div className='ml-3'>
                    <p className='text-lg font-semibold'>{user.name} {user.surname}</p>
                    <p>{ParseDate(user.createdAt)}</p>
                    <p className='text-gray-500'>{user.coment}</p>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
      <button className='bg-blue-500 p-3 text-white rounded-lg' onClick={handleClick}>Add users</button>
    </Layout>
  );
};

export default Coments;
