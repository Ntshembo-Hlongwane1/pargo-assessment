import { Text } from '@src/Components/Text/Text.component';
import './Tracker.styles.scss';
import React, { useState, ChangeEvent } from 'react';
import { Input } from '@src/Components/Input/Input.component';
import FakeOrder from '@src/Util/data.json';
import { useNavigate } from 'react-router-dom';

export const Tracker = () => {
  const [code, setCode] = useState('');
  const [validInput, setValidInput] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigate();

  const isValidTrackingCode = (trackingNumber: string): boolean => {
    // tracking number format: 10 digits or 10 digits followed by two letters
    const validNumberRegex = /^\d{10}$|^\d{10}[A-Za-z]{2}$/;
    return validNumberRegex.test(trackingNumber);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(`Tracker.page - 17`, e.target.value);
    setCode(e.target.value);
  };

  const onSubmit = () => {
    const isCodeValid = isValidTrackingCode(code);
    setValidInput(isCodeValid);

    if (isCodeValid === false) {
      setErrorMessage('Enter valid tracking number');
      return;
    }

    if (code !== FakeOrder.order_number) {
      setErrorMessage(
        'Order not found. Contact support team for more assistance',
      );
      return;
    }

    setErrorMessage('');
    navigation('/order-track');
  };

  return (
    <div className='trackcontainer'>
      <Text
        text='Stay Informed: Enter Your Tracking Number'
        color='#000'
        fontSize={25}
        variant='title'
      />
      <Text
        text="Make your parcel's journey transparent – simply by entering your tracking number."
        color='#000'
        fontSize={18}
        variant='paragraph'
      />
      <div className='trackcontainer_inputcontainer'>
        <Input
          onSubmit={onSubmit}
          onChange={handleChange}
          validInput={validInput}
          value={code}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};
