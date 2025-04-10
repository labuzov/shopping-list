// import { useContext, useState } from 'react';
// import { MdArrowBack } from 'react-icons/md';

// import { ShoppingItem } from '@/models/shoppingListModels';

// import { Drawer } from '../Drawer';
// import { OverlayComponentBase } from '../../OverlayComponentsContainer/OverlayComponentsContainer';
// import styles from './AddListItemsDrawer.module.scss';
// import { Textarea } from '../../FormControls/Textarea/Textarea';
// import { Button } from '../../Button/Button';
// import { IconButton } from '../../IconButton/IconButton';
// import { Label } from '../../Label/Label';
// import { useLoading } from '@/hooks/loadingHooks';
// import ListService from '@/services/ListService';


// type AddListItemsDrawerProps = OverlayComponentBase & {
//     listId: string;
// };

// export const AddListItemsDrawer: React.FC<AddListItemsDrawerProps> = ({ listId, open, onClose }) => {
//     const [items, setItems] = useState<ShoppingItem[]>([{ title: '' }]);

//     const { isLoading, addToLoading } = useLoading();

//     const handleCreate = async () => {
//         // await addToLoading(() => ListService.addItems(listId, shoppingItems));
//         onClose?.();
//     }

//     const handleItemChange = (key: keyof ShoppingItem, itemIndex: number, value: string) => {
//         setItems(items => {
//             const newItems = [];

//             for (let i = 0; i < items.length; i++) {
//                 const item = items[i];

//                 console.log(item.title, value);
//                 // if (key === 'title' && !item.title && !value) {
//                 // }

//                 if (i === itemIndex) {
//                     newItems.push({
//                         ...item,
//                         [key]: value 
//                     });
//                 } else {
//                     newItems.push(item);
//                 }
//             }

//             return newItems;
//         });
//     }

//     const handleRowAdd = () => {
//         setItems(items => [...items, {}]);
//     }

//     const renderRows = () => {
//         return (
//             items.map((item, index) => {
//                 return (
//                     <tr key={index}>
//                         <td>
//                             <input
//                                 type="text"
//                                 value={item.title}
//                                 onChange={e => handleItemChange('title', index, e.currentTarget.value)}
//                             />
//                         </td>
//                         <td>
//                             <input
//                                 type="text"
//                                 value={item.price}
//                                 onChange={e => handleItemChange('price', index, e.currentTarget.value)}
//                             />
//                         </td>
//                         <td>
//                             <input
//                                 type="text"
//                                 value={item.amount}
//                                 onChange={e => handleItemChange('amount', index, e.currentTarget.value)}
//                             />
//                         </td>
//                     </tr>
//                 )
//             })
//         );
//     }

//     return (
//         <Drawer
//             open={open}
//             paperClassName={styles.paper}
//             position="right"
//             onClose={onClose}
//         >
//             <div className={styles.header}>
//                 <IconButton Icon={MdArrowBack} onClick={onClose} />
//                 <div className={styles.title}>Добавить в список</div>
//             </div>

//             <div className={styles.content}>
//                 <table className={styles.table}>
//                     <thead>
//                         <tr>
//                             <th className={styles.thTitle}>Название</th>
//                             <th className={styles.thPrice}>Цена</th>
//                             <th className={styles.thAmount}>Кол-во</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {renderRows()}
//                     </tbody>

//                 </table>
//                 <div className="" onClick={handleRowAdd}>add</div>
//             </div>

//             <div className={styles.divider} />

//             <div className={styles.buttons}>
//                 <Button
//                     isLoading={isLoading}
//                     disabled={isLoading}
//                     text="Добавить"
//                     className={styles.btn}
//                     onClick={handleCreate}
//                 />
//             </div>
//         </Drawer>
//     );
// }