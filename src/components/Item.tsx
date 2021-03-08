import { FC } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Box, Button, Text } from 'grommet';
import { Trash } from 'grommet-icons';
import dayjs from 'dayjs';

import Switch from '../components/Switch';
import { deleteFromGroceryList, changeGroceryItemState } from '../store';

const DeleteIcon = styled(Trash)`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const BoxRelative = styled(Box)`
  position: relative;
`;

const Item: FC<{ item: GroceryItem }> = ({ item }) => {
  const dispatch = useDispatch();
  const date = dayjs(item.statusHistory[item.statusHistory.length - 1].date);

  return (
    <BoxRelative
      key={item.id}
      pad="large"
      align="center"
      background={{ color: 'light-2', opacity: 'strong' }}
      round
      gap="small"
    >
      <Button
        icon={<DeleteIcon color="brand" />}
        focusIndicator={false}
        plain
        onClick={() => dispatch(deleteFromGroceryList(item))}
      />
      <Text weight="bold">{item.title}</Text>
      <Text size="small">Last update: {date.format('DD, MMM hh:mm:ss')}</Text>
      <Switch
        checked={item.isHaving}
        onChange={(checked) =>
          dispatch(
            changeGroceryItemState({
              ...item,
              isHaving: checked,
            }),
          )
        }
      />
    </BoxRelative>
  );
};

export default Item;
