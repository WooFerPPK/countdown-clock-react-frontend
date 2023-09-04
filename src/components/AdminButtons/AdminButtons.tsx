import React, { useState } from 'react';
import FutureTimePicker from '../FutureTimePicker/FutureTimePicker';
import TimeDropdown from '../TimeDropdown/TimeDropdown';
import Button from '../Button/Button';
import { addTime, subtractTime, pauseClock } from '@/api/api';

interface AdminButtonsProps {
  endTime: number,
  paused: boolean,
  clockId: string,
  token: string,
  onTogglePause: (newState: boolean) => void,
  onEndTimeUpdate: (endTime: number) => void
}

const AdminButtons: React.FC<AdminButtonsProps> = ({endTime, paused, clockId, token, onTogglePause, onEndTimeUpdate}) => {
  const [time, setTime] = useState(null);
  const [futureTime, setFutureTime] = useState(null);

  const add = async () => {
    try {
      onEndTimeUpdate(endTime + time);
      await addTime({clockId, token, addTime: time});
    } catch (error) {

    }
  }

  const subtract = async () => {
    try {
      onEndTimeUpdate(endTime - time);
      await subtractTime({clockId, token, subtractTime: time});
    } catch (error) {
      
    }
  }

  const handleTimeDropdownSelect = (selectedTime: number) => {
    setTime(selectedTime);
  }

  const handleFutureTimePickerSelect = (selectedTime: number) => {
    setFutureTime(selectedTime);
  }

  const togglePause = async () => {
    try {
      const newPausedState = !paused;
      await pauseClock({clockId, token, paused});
      onTogglePause(newPausedState);
    } catch (error) {
      console.error("could not pause")
    }
  }

  return (
    <div>
      <div>
        <Button onClick={subtract} disabled={time == null}>Subtract</Button>
        <TimeDropdown onChange={handleTimeDropdownSelect} />
        <Button onClick={add} disabled={time == null}>Add</Button>
      </div>
      <div>
        <FutureTimePicker onSelect={handleFutureTimePickerSelect} onError={() => {}} minTimeMillis={endTime}/>
      </div>
      <div>
        <Button onClick={togglePause}>{paused ? 'Resume' : 'Pause'}</Button>
      </div>
    </div>
  );
};

export default AdminButtons;
