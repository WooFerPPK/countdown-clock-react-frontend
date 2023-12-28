import React from 'react';
import Layout from '@/components/Layout/Layout';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button/Button';
import { useGetAllClocks } from '@/hooks/useGetAllClocks';
import ClocksList from '@/components/ClocksList/ClocksList';
import './LandingPage.scss';


const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
  console.log(event)
};

const handleInputChange: (event: {}) => void = (event) => {
  console.log(event)
}



const LandingPage: React.FC = () => {
  const { data: clocks, error: clocksError, loading: clocksLoading } = useGetAllClocks();
  const navigate = useNavigate();
  
  const navigateToCreateClock = () => {
    navigate('/clock/create');
  }
  
  return (
    <Layout>
      <ClocksList clocks={clocks} loading={clocksLoading} error={clocksError} />
      <Button className='full-width' onClick={navigateToCreateClock}>Create Clock</Button>
    </Layout>
  );
};

export default LandingPage;
