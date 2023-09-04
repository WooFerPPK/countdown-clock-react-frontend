import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Link } from 'react-router-dom';
import { useGetAllClocks } from '@/hooks/useGetAllClocks';
import ClocksList from '@/components/ClocksList/ClocksList';


const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
  console.log(event)
};

const handleInputChange: (event: {}) => void = (event) => {
  console.log(event)
}

const LandingPage: React.FC = () => {
  const { data: clocks, error: clocksError, loading: clocksLoading } = useGetAllClocks();

  return (
    <Layout>
      <ClocksList clocks={clocks} loading={clocksLoading} error={clocksError} />
      <Link to={`/clock/create`}>Create Clock</Link>
    </Layout>
  );
};

export default LandingPage;
