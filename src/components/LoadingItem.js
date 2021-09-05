import React from 'react';

export const LoadingItem = () => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4'>
            {data.map((item, i) => (
                <div key={i} className='bg-white shadow-md border rounded-lg'>
                    <div className='w-full aspect-w-1 aspect-h-1'>
                        <img
                            src={item.itemPicture}
                            alt={item.itemName}
                            className='rounded-t-md object-cover'
                        />
                    </div>
                    <div className='group px-3 pt-2 flex flex-col'>
                        <h3 className='text-sm font-semibold md:text-lg'>
                            {item.itemName}
                        </h3>
                        <div className='text-gray-500 flex flex-col text-xs mb-2'>
                            <p>{item.itemAmount - item.itemInBorrow} Tersisa</p>
                        </div>
                        <div className='justify-center flex mb-2'>
                            <button
                                type='submit'
                                onClick={() =>
                                    history.push(
                                        `/app/user/pengajuan/${item._id}`
                                    )
                                }
                                className='bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md p-2'
                            >
                                Pinjam
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
