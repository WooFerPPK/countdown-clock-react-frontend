import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import FutureTimePicker from '@/components/FutureTimePicker/FutureTimePicker';
import Button from '@/components/Button/Button';
import ValidatedInput from '@/components/ValidatedInput/ValidatedInput';
import { useCreateNewClock } from '@/hooks/useCreateNewClock';
import useNotification from '@/hooks/useNotification';

const ClockCreate: React.FC = () => {
  const [selectedTimeMillis, setSelectedTimeMillis] = useState<number>(Date.now());
  const [clockName, setClockName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [timePickerError, setTimePickerError] = useState(false);
  const [clockNameError, setClockNameError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const { createClock, loading, error, success } = useCreateNewClock();
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();
  

  const handleTimePicker = (time: number) => {
    setSelectedTimeMillis(time);
  };

  const handleTimePickerError = (hasError: boolean) => {
    setTimePickerError(hasError);
  };

  const handleUsernameChange = (newUsername: string) => {
    setUsername(newUsername);
    if (newUsername === '' || newUsername === null) {
      setUsernameError('Username cannot be empty');
    } else {
      setUsernameError(null);
    }
  };  

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    if (newPassword === '') {
      setPasswordError('Password cannot be empty');
    } else {
      setPasswordError(null);
    }
  };

  const handleClockNameChange = (newClockName: string) => {
    setClockName(newClockName);
    if (newClockName === '') {
      setClockNameError('Password cannot be empty');
    } else {
      setClockNameError(null);
    }
  };

  const isSubmitDisabled = !!clockNameError || !!usernameError || !!passwordError || timePickerError;

  const handleSubmit = async () => {
    const payload = {
      endTime: selectedTimeMillis,
      description: clockName,
      username,
      password,
    };
    
    try {
      await createClock(payload);
    } catch (error) {
      showError(`An Error occuried: ${error}`);
      console.error( `An Error occuried: ${error}`);
    }
  };

  useEffect(() => {
    if (username === '') {
      setUsernameError('Username cannot be empty');
    }

    if (password === '') {
      setPasswordError('Password cannot be empty');
    }
    
    if (clockName === '') {
      setClockNameError('Your Clock must contain a name');
    }
  }, []);

  useEffect(() => {
    if (success) {
      showSuccess(`Clock successfully created!`);
      console.log('Clock successfully created!');
      navigate('/');
    }
    
    if (error) {
      showError(`An Error occuried: ${error}`);
      console.error( `An Error occuried: ${error}`);
    }
  }, [success, error]);

  return (
    <Layout className='page create'>
      <header>
        <h1>New Clock</h1>
      </header>
      <div className='item'>
        <label>End Time</label>
        <FutureTimePicker minTimeMillis={Date.now()} onSelect={handleTimePicker} onError={handleTimePickerError} />
      </div>
      <div className='item'>
        <label>Clock Name</label>
        <ValidatedInput className="clockName" type='text' onChange={handleClockNameChange} error={clockNameError}/>
      </div>
      <div className='item'>
        <label>Username</label>
        <ValidatedInput className="username" type='text' onChange={handleUsernameChange} error={usernameError}/>
      </div>
      <div className='item'>
        <label>Password</label>
        <ValidatedInput className="password" type='password' onChange={handlePasswordChange} error={passwordError}/>
      </div>
      <div className='buttons'>
        <Button className='full-width' onClick={handleSubmit} disabled={isSubmitDisabled || loading}>Create Clock</Button>
      </div>
    </Layout>
  );
};

export default ClockCreate;
