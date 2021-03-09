import { FC } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect, NavLink } from 'react-router-dom';
import { Layer, Box, Button, Text, AccordionPanel, Accordion } from 'grommet';
import { LinkPrevious, Trash } from 'grommet-icons';
import dayjs from 'dayjs';

import Switch from '../components/Switch';
import {
  RootState,
  selectGroceryItem,
  deleteFromGroceryList,
  changeGroceryItemState,
} from '../store';

const BackLink = styled(NavLink)`
  padding: 10px 0 0 10px;
`;

const BoxRelative = styled(Box)`
  position: relative;
  min-width: 320px;
`;

const DeleteIcon = styled(Trash)`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const AccordionFull = styled(Accordion)`
  width: 100%;
`;

const GroceryItem: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const item = useSelector((state: RootState) => selectGroceryItem(state, id));

  return item ? (
    <Layer position="top">
      <BackLink to="/">
        <LinkPrevious />
      </BackLink>
      <BoxRelative height="medium">
        <Button
          icon={<DeleteIcon color="brand" />}
          focusIndicator={false}
          plain
          onClick={() => dispatch(deleteFromGroceryList(item))}
        />
        <Box pad="large" align="center" gap="medium">
          <Text weight="bold">{item.title}</Text>
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
          <Text weight="bold">Priority: {item.priority}</Text>
          <AccordionFull animate>
            <AccordionPanel label="Status change history">
              <Box background="light-2" overflow="auto" height="medium">
                <Box height="large" pad="small" gap="medium" border="between">
                  {item.statusHistory.map((status) => (
                    <Text size="small">
                      {status.status ? 'Have' : 'Run out'} on{' '}
                      {dayjs(status.date).format('DD MMM hh:mm:ss')}
                    </Text>
                  ))}
                </Box>
              </Box>
            </AccordionPanel>
          </AccordionFull>
        </Box>
      </BoxRelative>
    </Layer>
  ) : (
    <Redirect to="/" />
  );
};

export default GroceryItem;
