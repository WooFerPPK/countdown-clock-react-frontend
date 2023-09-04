import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout/Layout';
import PasswordForm from '@/components/PasswordForm/PasswordForm';
import { useParams } from 'react-router-dom';
import { useGetClockById } from '@/hooks/useGetClockById';
import { useVerifyToken } from '@/hooks/useVerifyToken';
import CountdownTimer from '@/components/CountdownTimer/CountdownTimer';
import AdminButtonComponent from '@/components/AdminButtons/AdminButtons';
import { Clock } from '@/interfaces/Clock';

const ClockPage: React.FC = () => {
  // Get the clock id
  const { clockId } = useParams();
  // Get the token from localstorage if it is there
  const [token, setToken] = useState(localStorage.getItem(`token_${clockId}`));

  // Get clock data
  const { data: clock, error: clockError, loading: clockLoading, fetchClock } = useGetClockById(clockId);

  const [endTime, setEndTime] = useState(0);

  const [paused, setPaused] = useState(false);
  // Check if logged in to clock
  const { data: isVerified, error: verifiedError, loading: verifiedLoading, refetch: refetchVerify } = useVerifyToken(clockId, token);

  useEffect(() => {
    if (clock) {
      if (clock.endTime !== endTime) {
        setEndTime(clock.endTime);
      }
      if (clock.paused !== paused) {
        setPaused(clock.paused);
      }
    }
  }, [clock]);

  useEffect(() => {
    // Check to see if clock is paused, and then calls to get the most accurate time from the backend.
    if (paused === false) {
      fetchClock();
    }
  }, [paused]);

  const handleSuccess = (token: string) => {
    // If logged in set the token, and set it in local storage.
    setToken(token);
    localStorage.setItem(`token_${clockId}`, token);

    // Refetch the verify to comfirm that the token is valid.
    refetchVerify();
  }

  return (
    <Layout backRoute="/">
      {clock ? (
        <>
          <div>
            <CountdownTimer endTime={endTime} paused={paused} clock={clock}/>
          </div>
          <div>
            {verifiedLoading ? (
            <p>Verifying...</p>
            ) : isVerified === false ? (
              <PasswordForm clockId={clockId} onSubmitSuccess={(token: string) => handleSuccess(token)} />
            ) : (
              <AdminButtonComponent endTime={endTime} clockId={clockId} token={token} paused={paused} onTogglePause={setPaused} onEndTimeUpdate={setEndTime}/>
            )}
          </div>
        </>
      ) : (
        (!clock && clockLoading) ?
          (
            <p>Loading Clock Data</p>
          ) : (
            <p>Could not Clock Data</p>
          ) 
      )}

    </Layout>
  );
};

export default ClockPage;
