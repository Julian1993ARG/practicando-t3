import { ShoppingItem } from '@prisma/client';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { trpc } from '../utils/trpc';

interface ItemModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>
  setItems: Dispatch<SetStateAction<ShoppingItem[]>>
}

const ItemModal: FC<ItemModalProps> = ({ setModalOpen, setItems }) => {
  const [input, setInput] = useState<string>('');

  const { mutate: addItem } = trpc.useMutation(['items.addItem'], {
    onSuccess: (shoppingItem) => {
      setItems((prev) => [...prev, shoppingItem]);
    }
  });

  return (
    <div className='absolute inset-0 flex items-center justify-center bg-black/75 '>
      <div className='bg-white rounded-lg space-y-4 p-3'>
        <h3 className='text-xl font-semibold'>Name of item</h3>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='pl-2 w-full bg-gray-300 rounded-md border-gray-300 shadow-sm focus:border-violet-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50'
        />
        <div className='grid grid-cols-2 gap-4'>
          <button
            type='button'
            className='text-white text-sm bg-gray-500 hover:bg-gray-600 rounded-md transition p-1'
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              addItem({ name: input });
              setModalOpen(false);
              setInput('');
            }}
            type='button'
            className='text-white bg-violet-500 text-sm hover:bg-violet-600 rounded-md transition p-1'
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
