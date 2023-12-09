import React, { ChangeEvent, FocusEvent } from 'react';
import './Input.styles.scss';
import SearchIcon from '@assets/images/search.svg';
import { Text } from '@src/Components/Text/Text.component';

interface IProps {
  value: string;
  onChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  validInput: boolean;
  onSubmit: () => void;
  errorMessage: string;
}
export const Input = ({
  onBlur,
  onChange,
  value,
  validInput,
  onSubmit,
  errorMessage,
}: IProps) => {
  console.log(`Input.component - 14`, validInput);
  return (
    <>
      <div className={`inputcontainer ${validInput ? null : 'invalidinput'}`}>
        <input
          onChange={onChange}
          value={value}
          placeholder='Enter Tracking Code'
          className='inputcontainer_input'
        />
        <div onClick={onSubmit} className='inputcontainer_searchiconcontainer'>
          <img
            src={SearchIcon}
            className='inputcontainer_searchiconcontainer-icon'
          />
        </div>
      </div>
      <div className='errorcontainer'>
        {errorMessage.length > 0 && (
          <Text
            text={errorMessage}
            fontSize={17}
            variant='paragraph'
            color='#b33a3a'
          />
        )}
      </div>
    </>
  );
};
