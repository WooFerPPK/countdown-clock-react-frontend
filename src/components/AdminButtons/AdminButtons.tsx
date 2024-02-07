import React, { useState } from 'react';
import FutureTimePicker from '../FutureTimePicker/FutureTimePicker';
import TimeDropdown from '../TimeDropdown/TimeDropdown';
import Button from '../Button/Button';
import { addTime, subtractTime, pauseClock, deleteClock } from '@/api/api';
import useNotification from '@/hooks/useNotification';
import { useLocation, useNavigate } from 'react-router-dom';
import './AdminButtons.scss';

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
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

  const add = async () => {
    try {
      onEndTimeUpdate(endTime + time);
      await addTime({clockId, token, addTime: time});
    } catch (error) {
      showError('Could not add time');
    }
  }

  const subtract = async () => {
    try {
      onEndTimeUpdate(endTime - time);
      await subtractTime({clockId, token, subtractTime: time});
    } catch (error) {
      showError('Could not subtract time');
    }
  }

  const handleTimeDropdownSelect = (selectedTime: number) => {
    setTime(selectedTime);
  }

  const handleFutureTimePickerSelect = (selectedTime: number) => {
    setFutureTime(selectedTime);
  }

  const submitFutureTime = async () => {
    const calculatedAddedTime = futureTime - endTime;
    onEndTimeUpdate(endTime + calculatedAddedTime);
    await addTime({clockId, token, addTime: calculatedAddedTime});
  }

  const confirmDelete = async () => {
    try {
      await deleteClock({ clockId, token });
      showSuccess('Clock Deleted');
      navigate("/");
    } catch (error) {
      showError('Could not delete the clock');
    }
    setShowDeleteConfirmation(false);
  };

  const togglePause = async () => {
    try {
      const newPausedState = !paused;
      await pauseClock({clockId, token, paused});
      onTogglePause(newPausedState);
    } catch (error) {
      showError('Could not pause times');
    }
  }

  return (
    <div className='adminbuttons'>
      <div className='dropdown'>
        <Button onClick={subtract} disabled={time == null} >Subtract</Button>
        <TimeDropdown onChange={handleTimeDropdownSelect} />
        <Button onClick={add} disabled={time == null}>Add</Button>
      </div>
      <div className='futuretime'>
        <FutureTimePicker onSelect={handleFutureTimePickerSelect} onError={() => {}} minTimeMillis={endTime}/>
        <Button onClick={submitFutureTime}>Set Time</Button>
      </div>
      <div className='pause'>
        <Button onClick={togglePause}>{paused ? 'Resume Timer' : 'Pause Timer'}</Button>
      </div>
      <div className='delete'>
        <Button onClick={() => setShowDeleteConfirmation(true)}>Delete</Button>
        {showDeleteConfirmation && (
          <div className='modal'>
            <div className='content'>
            <p>Are you sure you want to delete?</p>
              <div className='buttons'>
                <Button onClick={confirmDelete}>Yes</Button>
                <Button onClick={() => setShowDeleteConfirmation(false)}>No</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminButtons;
