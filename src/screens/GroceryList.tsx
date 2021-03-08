import { FC, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Grid,
  ResponsiveContext,
  Heading,
  Button,
  Text,
  Layer,
  Form,
  FormField,
  Select,
} from 'grommet';
import { Add, Trash } from 'grommet-icons';

import GroceryItem from './GroceryItem';
import {
  addToGroceryList,
  deleteFromGroceryList,
  selectGroceryItems,
} from '../store';

const TextUppercase = styled(Text)`
  text-transform: uppercase;
  font-weight: bold;
`;

const DeleteIcon = styled(Trash)`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const BoxRelative = styled(Box)`
  position: relative;
`;

interface FormState {
  title?: string;
  priority?: '1' | '2' | '3' | '4' | '5';
}

const formDefault: FormState = {
  title: '',
  priority: '5',
};

const GroceryList: FC = () => {
  const dispatch = useDispatch();
  const groceryItems = useSelector(selectGroceryItems);
  const size = useContext(ResponsiveContext);
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const [value, setValue] = useState<FormState>(formDefault);

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
      </Box>
      {open && (
        <Layer position="top" onClickOutside={onClose}>
          <Box height="medium" overflow="auto">
            <Box pad="xlarge">
              <Form
                value={value}
                onChange={(nextValue, { touched }) => {
                  setValue(nextValue as FormState);
                }}
                onSubmit={(event) => {
                  dispatch(
                    addToGroceryList({
                      ...(event.value as GroceryItem),
                      id: uuid(),
                      isHaving: false,
                    }),
                  );

                  onClose();
                  setValue(formDefault);
                }}
              >
                <FormField
                  label="Title"
                  name="title"
                  required
                  validate={{ regexp: /^[\w\d]/i }}
                />
                <FormField
                  label="Priority"
                  name="priority"
                  required
                  component={Select}
                  options={['1', '2', '3', '4', '5']}
                />
                <Box
                  direction="row"
                  justify="between"
                  margin={{ top: 'medium' }}
                >
                  <Button
                    label="Close"
                    onClick={() => {
                      onClose();
                      setValue(formDefault);
                    }}
                  />
                  <Button type="submit" label="Save" primary />
                </Box>
              </Form>
            </Box>
          </Box>
        </Layer>
      )}
      <Grid columns={size === 'small' ? 'large' : 'medium'} gap="medium">
        {groceryItems.map((item) => (
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
            <div>{item.title}</div>
          </BoxRelative>
        ))}
      </Grid>
    </Box>
  );
};

export default GroceryList;
