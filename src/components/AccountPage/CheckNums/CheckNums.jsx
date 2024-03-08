import React, { useRef } from 'react';

const CheckNums = () => {
  const [digits, setDigits] = React.useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  //   const handleChange = (index, value) => {
  //     const newDigits = [...digits];
  //     newDigits[index] = value;
  //     setDigits(newDigits);

  //     if (index < inputRefs.length - 1 && value !== '') {
  //       inputRefs[index + 1].current.focus();
  //     }
  //   };

  return (
    <div>
      {digits.map((digit, index) => (
        <input
          key={index}
        //   ref={inputRefs[index]}
          type="text"
          maxLength="1"
        //   value={digit}
          placeholder="0"
          //   onChange={(e) => handleChange(index, e.target.value)}
        />
      ))}
    </div>
  );
};

export default CheckNums;
