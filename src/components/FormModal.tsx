import { FC, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { Box, Button, Form, FormField, Select } from 'grommet';

import { addToGroceryList } from '../store';

interface FormState {
  title?: string;
  priority?: '1' | '2' | '3' | '4' | '5';
}

const formDefault: FormState = {
  title: '',
  priority: '5',
};

const FormModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState<FormState>(formDefault);

  return (
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
          <Box direction="row" justify="between" margin={{ top: 'medium' }}>
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
  );
};

export default FormModal;
