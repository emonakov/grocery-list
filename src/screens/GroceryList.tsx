import { FC, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  Box,
  Grid,
  ResponsiveContext,
  Heading,
  Button,
  Text,
  Layer,
  Menu,
} from 'grommet';
import { Add } from 'grommet-icons';

import GroceryFormModal from '../components/FormModal';
import Item from '../components/Item';
import { selectGroceryItems, RootState } from '../store';

const TextUppercase = styled(Text)`
  text-transform: uppercase;
  font-weight: bold;
`;

const Filters = styled(Menu)`
  margin: 5px 0;
`;

const GroceryList: FC = () => {
  const [filter, setFilter] = useState<'all' | 'have' | 'runout'>('all');
  const groceryItems = useSelector((state: RootState) =>
    selectGroceryItems(state, filter),
  );
  const size = useContext(ResponsiveContext);
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <Box pad="large">
      <Box fill align="center" justify="center">
        <Heading level="3" size="medium">
          <Button
            icon={<Add color="brand" />}
            focusIndicator={false}
            label={<TextUppercase>Add grocery item</TextUppercase>}
            onClick={onOpen}
            plain
          />
        </Heading>
        <Filters
          focusIndicator={false}
          dropProps={{
            align: { top: 'bottom', left: 'left' },
            elevation: 'xlarge',
          }}
          label="Filters"
          items={[
            {
              label: 'All',
              onClick: () => setFilter('all'),
              disabled: filter === 'all',
            },
            {
              label: 'Have',
              onClick: () => setFilter('have'),
              disabled: filter === 'have',
            },
            {
              label: 'Run out',
              onClick: () => setFilter('runout'),
              disabled: filter === 'runout',
            },
          ]}
        />
      </Box>
      {open && (
        <Layer position="top" onClickOutside={onClose}>
          <GroceryFormModal onClose={onClose} />
        </Layer>
      )}
      <Grid columns={size === 'small' ? 'large' : 'medium'} gap="medium">
        {groceryItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </Grid>
    </Box>
  );
};

export default GroceryList;
