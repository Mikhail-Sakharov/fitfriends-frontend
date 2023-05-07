import {Slider} from '@mui/material';
import {useState} from 'react';

type RangeSliderProps = {
  minRangeValue: number;
  maxRangeValue: number;
  setExternalValue: (value: number[]) => void;
};

function RangeSlider({minRangeValue, maxRangeValue, setExternalValue}: RangeSliderProps): JSX.Element {
  const [value, setValue] = useState<number[]>([minRangeValue, maxRangeValue]);

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    const minDistance = 1;
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 10 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue);
      setExternalValue(newValue);
    }
  };

  return (
    <Slider
      sx={{
        '& .MuiSlider-thumb': {
          color: '#333',
          width: '16px',
          height: '16px'
        },
        '& .MuiSlider-rail': {
          color: '#aeaeae',
          height: '1px'
        },
        '& .MuiSlider-track': {
          color: '#333',
          height: '1px'
        }
      }}
      getAriaLabel={() => 'Minimum distance shift'}
      value={value}
      min={minRangeValue}
      max={maxRangeValue}
      onChange={handleChange}
      valueLabelDisplay="auto"
      disableSwap
    />
  );
}

export default RangeSlider;
