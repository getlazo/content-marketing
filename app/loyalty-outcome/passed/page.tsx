import LoyaltyResultScreen from '../../components/LoyaltyResultScreen';

export default function LoyaltyTestPassed() {
  return (
    <LoyaltyResultScreen
      result="passed"
      targetImg="/targetEduardo.jpg"
      checkerImg="/checkerTrinity.png"
      message="She replied 'I'm not interested'"
    />
  );
} 