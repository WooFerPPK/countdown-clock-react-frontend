import React, { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import useNotification from '@/hooks/useNotification';
import { authenticate } from '@/api/api';

interface PasswordFormProps {
  clockId: string,
  onSubmitSuccess: (token: string) => void
}

const PasswordForm: React.FC<PasswordFormProps> = ({ clockId, onSubmitSuccess }) => {
  const [password, setPassword] = useState('');
  const { showSuccess, showError } = useNotification();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      let { token } = await authenticate({
        clockId,
        password
      });
      onSubmitSuccess(token);
    } catch (error) {
      showError(`Invalid Password`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label>Password</label>
      <Input 
        type="password"
        value={password}
        onChange={setPassword}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        Submit
      </Button>
    </div>
  );
};

export default PasswordForm;
